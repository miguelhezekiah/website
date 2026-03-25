'use client';

import { useState, useRef, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Onest, Roboto_Mono } from 'next/font/google';

const onest = Onest({ subsets: ['latin'], weight: ['300', '500', '700'] });
const robotoMono = Roboto_Mono({ subsets: ['latin'], weight: ['300', '500'] });

// Define standard categories here. You can add more directly to this array.
const defaultJsonTemplate = 
`{
  "main_properties": {
    "year": "2000",
    "designer": "Marcel Breuer"
  },
  "spatial_boundaries": {
    "x_length_mm": 0,
    "y_width_mm": 0,
    "z_height_mm": 0,
    "volume_cm3": 0.0
  },
  "material_specifications": {
    "primary_material": "string",
    "composite_layers": ["layer_1", "layer_2"],
    "density_kg_m3": 0.0
  },
  "fabrication_parameters": {
    "method": "FDM_Print / CNC_Mill / Loom / Cast",
    "machine_tolerance_mm": 0.1,
    "estimated_time_mins": 0,
    "tool_path_type": "string"
  },
  "performance_architectural": {
    "tensile_strength_mpa": 0.0,
    "compressive_strength_mpa": 0.0,
    "acoustic_absorption_nrc": 0.0,
    "porosity_percentage": 0.0
  },
  "performance_textile": {
    "weave_pattern": "string",
    "yarn_count": 0,
    "weight_gsm": 0,
    "stretch_percentage": 0.0
  },
  "ecological_passport": {
    "embodied_carbon_kg_co2": 0.0,
    "recyclability_percentage": 100
  },
  "comments": "Additional notes or observations about the item."
}`;

interface Tag { id: string; name: string; }

export default function UploadTemplate() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [dbCategories, setDbCategories] = useState<string[]>([]);
  const [dbTags, setDbTags] = useState<Tag[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [newTags, setNewTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const [jsonParams, setJsonParams] = useState(defaultJsonTemplate);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function fetchTaxonomy() {
      // Fetch Tags
      const { data: tagsData } = await supabase.from('tags').select('*');
      if (tagsData) setDbTags(tagsData);

      // Fetch Categories
      const { data: catData } = await supabase.from('library_items').select('category');
      if (catData) {
        const uniqueCategories = Array.from(new Set(catData.map(r => r.category))).filter(Boolean);
        setDbCategories(uniqueCategories);
        if (uniqueCategories.length > 0) setCategory(uniqueCategories[0]);
      }
    }
    fetchTaxonomy();
  }, []);

  const toggleDbTag = (id: string) => setSelectedTagIds(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
  const removeNewTag = (tagName: string) => setNewTags(prev => prev.filter(t => t !== tagName));

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = tagInput.trim().toLowerCase();
      if (!val) return;

      const existing = dbTags.find(t => t.name.toLowerCase() === val);
      if (existing) {
        if (!selectedTagIds.includes(existing.id)) setSelectedTagIds([...selectedTagIds, existing.id]);
      } else if (!newTags.includes(val)) {
        setNewTags([...newTags, val]);
      }
      setTagInput('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const parsedJson = JSON.parse(jsonParams);

      // Step 1: Upload Image to Storage Bucket
      let coverImageUrl = '';
      if (file) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from('library-images').upload(fileName, file);
        if (uploadError) throw uploadError;
        
        const { data: urlData } = supabase.storage.from('library-images').getPublicUrl(fileName);
        coverImageUrl = urlData.publicUrl;
      }

      // Step 2: Create brand new tags in the DB
      const createdTagIds: string[] = [];
      for (const tagName of newTags) {
        const { data: newTagData, error: tagError } = await supabase.from('tags').insert([{ name: tagName }]).select();
        if (tagError) throw tagError;
        if (newTagData) {
          createdTagIds.push(newTagData[0].id);
          setDbTags(prev => [...prev, newTagData[0]]);
        }
      }

      // Step 3: Insert the core Library Item
      const { data: itemData, error: itemError } = await supabase.from('library_items').insert([{
        title,
        category: category.toLowerCase().replace(/\s+/g, '_') || 'uncategorized',
        cover_image: coverImageUrl,
        properties: parsedJson
      }]).select();
      
      if (itemError) throw itemError;
      const newItemId = itemData[0].id;

      // Step 4: Map the relationships in the junction table
      const finalTagIds = [...selectedTagIds, ...createdTagIds];
      if (finalTagIds.length > 0) {
        const junctionPayload = finalTagIds.map(tagId => ({ item_id: newItemId, tag_id: tagId }));
        const { error: junctionError } = await supabase.from('item_tags').insert(junctionPayload);
        if (junctionError) throw junctionError;
      }

      // Reset Form
      setStatus('success');
      setTitle('');
      setCategory(dbCategories[0] || '');
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setSelectedTagIds([]);
      setNewTags([]);
      setJsonParams(defaultJsonTemplate);

    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message || 'Failed to push to Supabase.');
    }
  };

  return (
    <div className={`min-h-screen bg-neutral-50 p-8 md:p-16 text-black ${onest.className}`}>
      <div className="max-w-2xl mx-auto bg-white border border-neutral-200 shadow-xl p-8 md:p-12 relative">
        <header className="mb-10 border-b border-neutral-200 pb-6 pr-32">
          <h1 className="text-3xl font-bold tracking-tight">Data Entry Node</h1>
          <p className="text-sm text-neutral-500 mt-2">Inject items into the Supabase architecture.</p>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Node Title</label>
            <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border border-neutral-300 px-4 py-2 focus:outline-none focus:border-black" placeholder="e.g., Voronoi Shell" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Category</label>
              {dbCategories.length === 0 ? (
                 <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Type first category..." className="border border-neutral-300 px-4 py-2 focus:outline-none" />
              ) : (
                <select required value={category} onChange={(e) => setCategory(e.target.value)} className="border border-neutral-300 px-4 py-2 focus:outline-none bg-white">
                  {dbCategories.map(cat => <option key={cat} value={cat}>{cat.replace('_', ' ')}</option>)}
                </select>
              )}
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Cover Image</label>
              <input type="file" accept="image/*" ref={fileInputRef} onChange={(e) => setFile(e.target.files?.[0] || null)} className="border border-neutral-300 px-4 py-1.5 text-sm file:mr-4 file:py-1 file:px-3 file:border-0 file:bg-black file:text-white file:text-xs file:font-bold hover:file:bg-neutral-800" />
            </div>
          </div>

          {/* Tags Engine */}
          <div className="flex flex-col gap-2 pt-2">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Taxonomy Tags</label>
            {(selectedTagIds.length > 0 || newTags.length > 0) && (
              <div className="flex flex-wrap gap-2 mb-2">
                {dbTags.filter(t => selectedTagIds.includes(t.id)).map(t => (
                  <span key={t.id} onClick={() => toggleDbTag(t.id)} className="px-2 py-1 text-[10px] uppercase tracking-wider bg-black text-white cursor-pointer hover:bg-red-600">{t.name} &times;</span>
                ))}
                {newTags.map(t => (
                  <span key={t} onClick={() => removeNewTag(t)} className="px-2 py-1 text-[10px] uppercase tracking-wider bg-neutral-400 text-white cursor-pointer hover:bg-red-600">{t} (New) &times;</span>
                ))}
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-2">
              {dbTags.length > 0 && (
                <select onChange={(e) => { if(e.target.value) toggleDbTag(e.target.value); e.target.value=''; }} className="border border-neutral-300 px-4 py-2 text-sm focus:outline-none bg-white">
                  <option value="">Existing tags...</option>
                  {dbTags.filter(t => !selectedTagIds.includes(t.id)).map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              )}
              <input type="text" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={handleTagKeyDown} placeholder="Type new tag & press Enter" className="border border-neutral-300 px-4 py-2 text-sm flex-grow focus:outline-none" />
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Parametric Properties</label>
            <textarea required rows={5} value={jsonParams} onChange={(e) => setJsonParams(e.target.value)} className={`${robotoMono.className} text-xs border border-neutral-300 p-4 bg-neutral-900 text-green-400 focus:outline-none`} />
            {status === 'error' && <p className="text-xs text-red-500 font-bold mt-1">Error: {errorMessage}</p>}
          </div>

          <button type="submit" disabled={status === 'loading'} className="mt-4 bg-black text-white font-bold uppercase tracking-widest text-sm py-4 hover:bg-neutral-800 disabled:opacity-50">
            {status === 'loading' ? 'Executing Transaction...' : status === 'success' ? 'Node Committed - Add Another' : 'Commit to Database'}
          </button>
        </form>
      </div>
    </div>
  );
}