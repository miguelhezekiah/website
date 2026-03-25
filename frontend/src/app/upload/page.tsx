'use client';

import { useState, useRef, useEffect } from 'react';
import pb from '../../lib/pocketbase';
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
  
  // Image State & Ref
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // Used to physically clear the file input

  // Tag States
  const [dbCategories, setDbCategories] = useState<string[]>([]);
  const [dbTags, setDbTags] = useState<Tag[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [newTags, setNewTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const [jsonParams, setJsonParams] = useState(defaultJsonTemplate);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch existing tags on load
  useEffect(() => {
    pb.collection('tags').getFullList<Tag>().then(setDbTags).catch(console.error);
    
    // 2. Fetch Categories (Optimized to only return the 'category' field)
    pb.collection('library_items').getFullList({
      fields: 'category', 
    }).then((records) => {
      // Extract categories, remove duplicates using Set, and filter out any empty values
      const uniqueCategories = Array.from(new Set(records.map(r => r.category))).filter(Boolean);
      setDbCategories(uniqueCategories);
      
      // Automatically select the first category in the list
      if (uniqueCategories.length > 0) {
        setCategory(uniqueCategories[0]);
      }
    }).catch(console.error);
  }, []);

  // Tag Interaction Logic
  const toggleDbTag = (id: string) => {
    setSelectedTagIds(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
  };

  const removeNewTag = (tagName: string) => {
    setNewTags(prev => prev.filter(t => t !== tagName));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the main form from submitting early
      const val = tagInput.trim().toLowerCase();
      if (!val) return;

      // Check if it already exists in the database
      const existing = dbTags.find(t => t.name.toLowerCase() === val);
      if (existing) {
        if (!selectedTagIds.includes(existing.id)) setSelectedTagIds([...selectedTagIds, existing.id]);
      } else if (!newTags.includes(val)) {
        setNewTags([...newTags, val]); // Stage as a brand new tag
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
      const formData = new FormData();
      formData.append('title', title);
      formData.append('category', category.toLowerCase().replace(/\s+/g, '_'));
      formData.append('properties', JSON.stringify(parsedJson));
      
      if (file) formData.append('cover_image', file);

      // 1. Create any brand new tags first
      const createdTagIds: string[] = [];
      for (const tagName of newTags) {
        const newRecord = await pb.collection('tags').create({ name: tagName });
        createdTagIds.push(newRecord.id);
        setDbTags(prev => [...prev, { id: newRecord.id, name: newRecord.name }]); // Update local DB state
      }

      // 2. Combine existing selections with newly created tag IDs
      const finalTagIds = [...selectedTagIds, ...createdTagIds];
      
      // 3. Append relational IDs to FormData (PocketBase accepts multiple appends for arrays)
      for (const id of finalTagIds) {
        formData.append('tags', id);
      }

      // 4. Inject into the main library
      await pb.collection('library_items').create(formData);
      
      // 5. Reset everything
      setStatus('success');
      setTitle('');
      setCategory('');
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = ''; // Wipes the physical input UI
      setSelectedTagIds([]);
      setNewTags([]);
      setJsonParams(defaultJsonTemplate);

    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || 'Failed to parse JSON or connect to database.');
    }
  };

  return (
    <div className={`min-h-screen bg-neutral-50 p-8 md:p-16 text-black ${onest.className}`}>
      <div className="max-w-2xl mx-auto bg-white border border-neutral-200 shadow-xl p-8 md:p-12 relative">
        
        {/* Top Navigation Link */}
        <a href="/" className="absolute top-12 right-12 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-black transition-colors">
          Close
        </a>

        <header className="mb-10 border-b border-neutral-200 pb-6 pr-32">
          <h1 className="text-3xl font-bold tracking-tight">+Item</h1>
          <p className="text-sm text-neutral-500 mt-2">Add new items into the visual library.</p>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Item Name</label>
            <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border border-neutral-300 px-4 py-2 focus:outline-none focus:border-black transition-colors" placeholder="e.g., Voronoi Shell Component" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Category</label>
              {/* Converted to a strict Select Dropdown */}
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="border border-neutral-300 px-4 py-2 focus:outline-none focus:border-black transition-colors bg-white">
                {dbCategories.length === 0 ? (
                  <option value="" disabled>Loading database categories...</option>
                ) : (
                  dbCategories.map(cat => (
                    <option key={cat} value={cat}>{cat.replace('_', ' ')}</option>
                  ))
                )}
              </select>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Cover Image</label>
              <input 
                type="file" accept="image/*" ref={fileInputRef} onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="border border-neutral-300 px-4 py-1.5 text-xs file:mr-4 file:py-1 file:px-3 file:border-0 file:bg-black file:text-white file:text-xs file:font-bold hover:file:bg-neutral-800 transition-colors"
              />
            </div>
          </div>

          {/* Advanced Multi-Picker Tag Engine */}
          <div className="flex flex-col gap-2 pt-2">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Tags</label>
            
            {/* Visual Pills for Selected Tags */}
            {(selectedTagIds.length > 0 || newTags.length > 0) && (
              <div className="flex flex-wrap gap-2 mb-2">
                {dbTags.filter(t => selectedTagIds.includes(t.id)).map(t => (
                  <span key={t.id} onClick={() => toggleDbTag(t.id)} className="px-2 py-1 text-xs uppercase tracking-wider bg-black text-white cursor-pointer hover:bg-red-600 transition-colors">
                    {t.name} &times;
                  </span>
                ))}
                {newTags.map(t => (
                  <span key={t} onClick={() => removeNewTag(t)} className="px-2 py-1 text-xs uppercase tracking-wider bg-neutral-400 text-white cursor-pointer hover:bg-red-600 transition-colors">
                    {t} (New) &times;
                  </span>
                ))}
              </div>
            )}

            {/* Tag Selection / Creation Inputs */}
            <div className="flex flex-col sm:flex-row gap-2">
              <select onChange={(e) => { if(e.target.value) toggleDbTag(e.target.value); e.target.value=''; }} className="border border-neutral-300 px-4 py-2 text-sm focus:outline-none focus:border-black bg-white">
                <option value="">Select existing tag...</option>
                {dbTags.filter(t => !selectedTagIds.includes(t.id)).map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
              <input 
                type="text" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={handleTagKeyDown}
                placeholder="Or type new tag & press Enter"
                className="border border-neutral-300 px-4 py-2 text-sm flex-grow focus:outline-none focus:border-black transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <label className="text-xs font-bold uppercase tracking-widest text-neutral-400">Properties (JSON)</label>
            <textarea required rows={7} value={jsonParams} onChange={(e) => setJsonParams(e.target.value)} className={`${robotoMono.className} text-xs border border-neutral-300 p-4 bg-neutral-900 text-green-400 focus:outline-none`} />
            {status === 'error' && <p className="text-xs text-red-500 font-bold mt-1">Error: {errorMessage}</p>}
          </div>

          <button type="submit" disabled={status === 'loading'} className="mt-4 bg-black text-white font-bold uppercase tracking-widest text-sm py-4 hover:bg-neutral-800 transition-colors disabled:opacity-50">
            {status === 'loading' ? 'Adding new items...' : status === 'success' ? 'Item Added Successfully - Add Another' : 'Add to Library'}
          </button>
        </form>
      </div>
    </div>
  );
}