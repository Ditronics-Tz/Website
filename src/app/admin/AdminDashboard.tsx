'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  Trash2, 
  Edit, 
  LogOut, 
  Laptop, 
  Save,
  X,
  Upload
} from 'lucide-react';
import type { Laptop as LaptopType } from '@/lib/db';

interface AdminDashboardProps {
  initialLaptops: LaptopType[];
}

// Spec options for dropdowns
const cpuOptions = [
  // Intel Core (Latest Gen)
  'Intel Core i3-1215U', 'Intel Core i3-1315U', 'Intel Core i3-1335U',
  'Intel Core i5-1235U', 'Intel Core i5-1335U', 'Intel Core i5-1345U',
  'Intel Core i5-12450H', 'Intel Core i5-13450H', 'Intel Core i5-13500H',
  'Intel Core i7-1255U', 'Intel Core i7-1355U', 'Intel Core i7-1365U',
  'Intel Core i7-12650H', 'Intel Core i7-13650H', 'Intel Core i7-13700H', 'Intel Core i7-13850H',
  'Intel Core i9-13900H', 'Intel Core i9-13980HX', 'Intel Core i9-14900HX',
  // Intel Core Ultra
  'Intel Core Ultra 5 125H', 'Intel Core Ultra 5 135H',
  'Intel Core Ultra 7 155H', 'Intel Core Ultra 7 165H',
  'Intel Core Ultra 9 185H',
  // AMD Ryzen
  'AMD Ryzen 3 7320U', 'AMD Ryzen 3 7330U',
  'AMD Ryzen 5 7520U', 'AMD Ryzen 5 7530U', 'AMD Ryzen 5 7535U', 'AMD Ryzen 5 7540U',
  'AMD Ryzen 5 7535HS', 'AMD Ryzen 5 7640HS', 'AMD Ryzen 5 8540U', 'AMD Ryzen 5 8640HS',
  'AMD Ryzen 7 7730U', 'AMD Ryzen 7 7735U', 'AMD Ryzen 7 7840HS', 'AMD Ryzen 7 8840HS',
  'AMD Ryzen 9 7940HS', 'AMD Ryzen 9 8945HS', 'AMD Ryzen 9 7945HX',
  // Apple Silicon
  'Apple M1', 'Apple M1 Pro', 'Apple M1 Max',
  'Apple M2', 'Apple M2 Pro', 'Apple M2 Max',
  'Apple M3', 'Apple M3 Pro', 'Apple M3 Max',
  'Apple M4', 'Apple M4 Pro', 'Apple M4 Max',
];

const ramSizeOptions = ['4GB', '8GB', '16GB', '32GB', '64GB', '128GB'];
const ramTypeOptions = ['DDR3', 'DDR4', 'DDR5', 'LPDDR4', 'LPDDR4X', 'LPDDR5', 'LPDDR5X', 'Unified Memory'];

const storageSizeOptions = ['128GB', '256GB', '512GB', '1TB', '2TB', '4TB'];
const storageTypeOptions = ['HDD', 'SATA SSD', 'NVMe SSD', 'PCIe 4.0 SSD', 'PCIe 5.0 SSD'];

const gpuOptions = [
  // Integrated
  'Intel UHD Graphics', 'Intel Iris Xe Graphics', 'Intel Arc Graphics',
  'AMD Radeon Graphics', 'AMD Radeon 610M', 'AMD Radeon 680M', 'AMD Radeon 780M', 'AMD Radeon 890M',
  'Apple GPU (8-core)', 'Apple GPU (10-core)', 'Apple GPU (14-core)', 'Apple GPU (16-core)', 
  'Apple GPU (19-core)', 'Apple GPU (30-core)', 'Apple GPU (38-core)', 'Apple GPU (40-core)',
  // NVIDIA GeForce RTX 30 Series
  'NVIDIA GeForce RTX 3050', 'NVIDIA GeForce RTX 3050 Ti', 'NVIDIA GeForce RTX 3060',
  'NVIDIA GeForce RTX 3070', 'NVIDIA GeForce RTX 3070 Ti', 'NVIDIA GeForce RTX 3080', 'NVIDIA GeForce RTX 3080 Ti',
  // NVIDIA GeForce RTX 40 Series
  'NVIDIA GeForce RTX 4050', 'NVIDIA GeForce RTX 4060', 'NVIDIA GeForce RTX 4070',
  'NVIDIA GeForce RTX 4080', 'NVIDIA GeForce RTX 4090',
  // AMD Radeon RX
  'AMD Radeon RX 6500M', 'AMD Radeon RX 6600M', 'AMD Radeon RX 6700M', 'AMD Radeon RX 6800M',
  'AMD Radeon RX 7600M', 'AMD Radeon RX 7700M', 'AMD Radeon RX 7900M',
];

const displaySizeOptions = ['11.6"', '13.3"', '13.6"', '14"', '14.2"', '15.6"', '16"', '16.2"', '17.3"', '18"'];
const displayResolutionOptions = [
  'HD (1366x768)', 'FHD (1920x1080)', 'FHD+ (1920x1200)', 'FHD+ (2560x1600)',
  'QHD (2560x1440)', 'QHD+ (2880x1800)', 'QHD+ (3024x1964)',
  '4K UHD (3840x2160)', '4K+ (3456x2234)',
  'OLED FHD', 'OLED QHD', 'OLED 4K',
];
const displayPanelOptions = ['IPS', 'TN', 'VA', 'OLED', 'Mini-LED', 'Liquid Retina', 'Liquid Retina XDR'];
const displayRefreshOptions = ['60Hz', '90Hz', '120Hz', '144Hz', '165Hz', '240Hz', '360Hz'];

const batteryOptions = [
  '40Wh', '42Wh', '45Wh', '50Wh', '52Wh', '54Wh', '56Wh', '57Wh', 
  '60Wh', '63Wh', '66Wh', '70Wh', '72Wh', '76Wh', '80Wh', '84Wh', 
  '86Wh', '90Wh', '96Wh', '99.9Wh', '100Wh'
];

export function AdminDashboard({ initialLaptops }: AdminDashboardProps) {
  const router = useRouter();
  const [laptops, setLaptops] = useState(initialLaptops);
  const [showForm, setShowForm] = useState(false);
  const [editingLaptop, setEditingLaptop] = useState<LaptopType | null>(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Form state for combined fields
  const [ramSize, setRamSize] = useState('16GB');
  const [ramType, setRamType] = useState('DDR4');
  const [storageSize, setStorageSize] = useState('512GB');
  const [storageType, setStorageType] = useState('NVMe SSD');
  const [displaySize, setDisplaySize] = useState('15.6"');
  const [displayResolution, setDisplayResolution] = useState('FHD (1920x1080)');
  const [displayPanel, setDisplayPanel] = useState('IPS');
  const [displayRefresh, setDisplayRefresh] = useState('60Hz');

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      if (editingLaptop) {
        formData.append('id', editingLaptop.id.toString());
        await fetch('/api/laptops', {
          method: 'PUT',
          body: formData,
        });
      } else {
        await fetch('/api/laptops', {
          method: 'POST',
          body: formData,
        });
      }
      
      // Refresh data
      const res = await fetch('/api/laptops');
      const data = await res.json();
      setLaptops(data);
      setShowForm(false);
      setEditingLaptop(null);
      setImagePreview(null);
    } catch (error) {
      alert('Failed to save laptop');
    }
    
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this laptop?')) return;
    
    try {
      await fetch('/api/laptops', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      });
      setLaptops(laptops.filter(l => l.id !== id));
    } catch (error) {
      alert('Failed to delete laptop');
    }
  };

  const handleEdit = (laptop: LaptopType) => {
    setEditingLaptop(laptop);
    setImagePreview(laptop.image || null);
    
    // Parse existing values for edit mode
    if (laptop.ram) {
      const ramMatch = laptop.ram.match(/^(\d+GB)\s*(.*)$/);
      if (ramMatch) {
        setRamSize(ramMatch[1]);
        setRamType(ramMatch[2] || 'DDR4');
      }
    }
    if (laptop.storage) {
      const storageMatch = laptop.storage.match(/^(\d+(?:GB|TB))\s*(.*)$/);
      if (storageMatch) {
        setStorageSize(storageMatch[1]);
        setStorageType(storageMatch[2] || 'NVMe SSD');
      }
    }
    if (laptop.display) {
      const displayParts = laptop.display.split(' ');
      if (displayParts[0]) setDisplaySize(displayParts[0]);
    }
    
    setShowForm(true);
  };

  const resetFormState = () => {
    setRamSize('16GB');
    setRamType('DDR4');
    setStorageSize('512GB');
    setStorageType('NVMe SSD');
    setDisplaySize('15.6"');
    setDisplayResolution('FHD (1920x1080)');
    setDisplayPanel('IPS');
    setDisplayRefresh('60Hz');
    setImagePreview(null);
    setEditingLaptop(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-TZ').format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/DITRONICS-COMPANY-LOGO.png"
              alt="Ditronics"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <h1 className="text-xl font-bold text-[var(--anchor-dark)]">Admin Dashboard</h1>
              <p className="text-sm text-gray-500">Manage your laptops</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => router.push('/laptops')}>
              View Site
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut size={18} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[var(--vermilion)]/10 flex items-center justify-center">
                <Laptop size={24} className="text-[var(--vermilion)]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--anchor-dark)]">{laptops.length}</p>
                <p className="text-sm text-gray-500">Total Laptops</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[var(--teal-green)]/10 flex items-center justify-center">
                <Laptop size={24} className="text-[var(--teal-green)]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--anchor-dark)]">
                  {laptops.filter(l => l.stock_status === 'In Stock').length}
                </p>
                <p className="text-sm text-gray-500">In Stock</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[var(--sunny)]/10 flex items-center justify-center">
                <Laptop size={24} className="text-[var(--sunny)]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[var(--anchor-dark)]">
                  {laptops.filter(l => l.featured).length}
                </p>
                <p className="text-sm text-gray-500">Featured</p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[var(--anchor-dark)]">Laptops</h2>
          <Button variant="primary" onClick={() => { setShowForm(true); resetFormState(); }}>
            <Plus size={18} className="mr-2" />
            Add Laptop
          </Button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {editingLaptop ? 'Edit Laptop' : 'Add New Laptop'}
                </h3>
                <button onClick={() => { setShowForm(false); resetFormState(); }}>
                  <X size={24} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Laptop Name *</label>
                    <Input 
                      name="name" 
                      required 
                      defaultValue={editingLaptop?.name}
                      placeholder="e.g. Dell XPS 15 9530"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Price (TZS) *</label>
                    <Input 
                      name="price" 
                      type="number" 
                      required 
                      defaultValue={editingLaptop?.price}
                      placeholder="e.g. 2500000"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Currency</label>
                    <select 
                      name="currency" 
                      className="w-full h-11 rounded-lg border border-gray-200 px-4"
                      defaultValue={editingLaptop?.currency || 'TZS'}
                    >
                      <option value="TZS">TZS</option>
                      <option value="USD">USD</option>
                    </select>
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">CPU / Processor</label>
                    <select 
                      name="cpu" 
                      className="w-full h-11 rounded-lg border border-gray-200 px-4"
                      defaultValue={editingLaptop?.cpu || ''}
                    >
                      <option value="">Select CPU</option>
                      <optgroup label="Intel Core (12th-14th Gen)">
                        {cpuOptions.filter(c => c.startsWith('Intel Core i')).map(cpu => (
                          <option key={cpu} value={cpu}>{cpu}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Intel Core Ultra">
                        {cpuOptions.filter(c => c.startsWith('Intel Core Ultra')).map(cpu => (
                          <option key={cpu} value={cpu}>{cpu}</option>
                        ))}
                      </optgroup>
                      <optgroup label="AMD Ryzen">
                        {cpuOptions.filter(c => c.startsWith('AMD')).map(cpu => (
                          <option key={cpu} value={cpu}>{cpu}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Apple Silicon">
                        {cpuOptions.filter(c => c.startsWith('Apple')).map(cpu => (
                          <option key={cpu} value={cpu}>{cpu}</option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">RAM Size</label>
                    <select 
                      className="w-full h-11 rounded-lg border border-gray-200 px-4"
                      value={ramSize}
                      onChange={(e) => setRamSize(e.target.value)}
                    >
                      {ramSizeOptions.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                    <input type="hidden" name="ram" value={`${ramSize} ${ramType}`} />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">RAM Type</label>
                    <select 
                      className="w-full h-11 rounded-lg border border-gray-200 px-4"
                      value={ramType}
                      onChange={(e) => setRamType(e.target.value)}
                    >
                      {ramTypeOptions.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Storage Size</label>
                    <select 
                      className="w-full h-11 rounded-lg border border-gray-200 px-4"
                      value={storageSize}
                      onChange={(e) => setStorageSize(e.target.value)}
                    >
                      {storageSizeOptions.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                    <input type="hidden" name="storage" value={`${storageSize} ${storageType}`} />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Storage Type</label>
                    <select 
                      className="w-full h-11 rounded-lg border border-gray-200 px-4"
                      value={storageType}
                      onChange={(e) => setStorageType(e.target.value)}
                    >
                      {storageTypeOptions.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">GPU / Graphics</label>
                    <select 
                      name="gpu" 
                      className="w-full h-11 rounded-lg border border-gray-200 px-4"
                      defaultValue={editingLaptop?.gpu || ''}
                    >
                      <option value="">Select GPU</option>
                      <optgroup label="Integrated Graphics">
                        {gpuOptions.filter(g => g.includes('UHD') || g.includes('Iris') || g.includes('Intel Arc') || g.includes('Radeon Graphics') || g.includes('Radeon 6') || g.includes('Radeon 7') || g.includes('Radeon 8') || g.includes('Apple')).map(gpu => (
                          <option key={gpu} value={gpu}>{gpu}</option>
                        ))}
                      </optgroup>
                      <optgroup label="NVIDIA GeForce RTX 30 Series">
                        {gpuOptions.filter(g => g.includes('RTX 30')).map(gpu => (
                          <option key={gpu} value={gpu}>{gpu}</option>
                        ))}
                      </optgroup>
                      <optgroup label="NVIDIA GeForce RTX 40 Series">
                        {gpuOptions.filter(g => g.includes('RTX 40')).map(gpu => (
                          <option key={gpu} value={gpu}>{gpu}</option>
                        ))}
                      </optgroup>
                      <optgroup label="AMD Radeon RX">
                        {gpuOptions.filter(g => g.includes('RX')).map(gpu => (
                          <option key={gpu} value={gpu}>{gpu}</option>
                        ))}
                      </optgroup>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Display Size</label>
                    <select 
                      className="w-full h-11 rounded-lg border border-gray-200 px-4"
                      value={displaySize}
                      onChange={(e) => setDisplaySize(e.target.value)}
                    >
                      {displaySizeOptions.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                    <input type="hidden" name="display" value={`${displaySize} ${displayResolution} ${displayPanel} ${displayRefresh}`} />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Resolution</label>
                    <select 
                      className="w-full h-11 rounded-lg border border-gray-200 px-4"
                      value={displayResolution}
                      onChange={(e) => setDisplayResolution(e.target.value)}
                    >
                      {displayResolutionOptions.map(res => (
                        <option key={res} value={res}>{res}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Panel Type</label>
                    <select 
                      className="w-full h-11 rounded-lg border border-gray-200 px-4"
                      value={displayPanel}
                      onChange={(e) => setDisplayPanel(e.target.value)}
                    >
                      {displayPanelOptions.map(panel => (
                        <option key={panel} value={panel}>{panel}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Refresh Rate</label>
                    <select 
                      className="w-full h-11 rounded-lg border border-gray-200 px-4"
                      value={displayRefresh}
                      onChange={(e) => setDisplayRefresh(e.target.value)}
                    >
                      {displayRefreshOptions.map(rate => (
                        <option key={rate} value={rate}>{rate}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Battery</label>
                    <select 
                      name="battery" 
                      className="w-full h-11 rounded-lg border border-gray-200 px-4"
                      defaultValue={editingLaptop?.battery || ''}
                    >
                      <option value="">Select Battery</option>
                      {batteryOptions.map(battery => (
                        <option key={battery} value={battery}>{battery}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Stock Status</label>
                    <select 
                      name="stock_status" 
                      className="w-full h-11 rounded-lg border border-gray-200 px-4"
                      defaultValue={editingLaptop?.stock_status || 'In Stock'}
                    >
                      <option value="In Stock">In Stock</option>
                      <option value="Limited">Limited</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Condition</label>
                    <select 
                      name="condition" 
                      className="w-full h-11 rounded-lg border border-gray-200 px-4"
                      defaultValue={editingLaptop?.condition || 'Brand New'}
                    >
                      <option value="Brand New">Brand New</option>
                      <option value="Refurbished">Refurbished</option>
                      <option value="Used - Like New">Used - Like New</option>
                      <option value="Used - Good">Used - Good</option>
                    </select>
                  </div>

                  {/* Extended Specs Section */}
                  <div className="col-span-2 border-t border-gray-200 pt-4 mt-2">
                    <h4 className="text-sm font-semibold text-[var(--anchor-dark)] mb-4">Additional Details (for detail page)</h4>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Brand</label>
                    <select 
                      name="brand" 
                      className="w-full h-11 rounded-lg border border-gray-200 px-4"
                      defaultValue={editingLaptop?.brand || ''}
                    >
                      <option value="">Select Brand</option>
                      <option value="Dell">Dell</option>
                      <option value="HP">HP</option>
                      <option value="Lenovo">Lenovo</option>
                      <option value="Apple">Apple</option>
                      <option value="ASUS">ASUS</option>
                      <option value="Acer">Acer</option>
                      <option value="MSI">MSI</option>
                      <option value="Microsoft">Microsoft</option>
                      <option value="Samsung">Samsung</option>
                      <option value="Razer">Razer</option>
                      <option value="Gigabyte">Gigabyte</option>
                      <option value="LG">LG</option>
                      <option value="Toshiba">Toshiba</option>
                      <option value="Huawei">Huawei</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Model Number</label>
                    <Input 
                      name="model_number" 
                      defaultValue={editingLaptop?.model_number}
                      placeholder="e.g. XPS 15 9530"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Operating System</label>
                    <select 
                      name="os" 
                      className="w-full h-11 rounded-lg border border-gray-200 px-4"
                      defaultValue={editingLaptop?.os || ''}
                    >
                      <option value="">Select OS</option>
                      <option value="Windows 11 Home">Windows 11 Home</option>
                      <option value="Windows 11 Pro">Windows 11 Pro</option>
                      <option value="Windows 10 Home">Windows 10 Home</option>
                      <option value="Windows 10 Pro">Windows 10 Pro</option>
                      <option value="macOS Sonoma">macOS Sonoma</option>
                      <option value="macOS Ventura">macOS Ventura</option>
                      <option value="macOS Monterey">macOS Monterey</option>
                      <option value="Chrome OS">Chrome OS</option>
                      <option value="Ubuntu">Ubuntu</option>
                      <option value="Linux">Linux</option>
                      <option value="FreeDOS">FreeDOS</option>
                      <option value="No OS">No OS</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Color</label>
                    <select 
                      name="color" 
                      className="w-full h-11 rounded-lg border border-gray-200 px-4"
                      defaultValue={editingLaptop?.color || ''}
                    >
                      <option value="">Select Color</option>
                      <option value="Silver">Silver</option>
                      <option value="Space Gray">Space Gray</option>
                      <option value="Black">Black</option>
                      <option value="White">White</option>
                      <option value="Gold">Gold</option>
                      <option value="Rose Gold">Rose Gold</option>
                      <option value="Blue">Blue</option>
                      <option value="Graphite">Graphite</option>
                      <option value="Platinum">Platinum</option>
                      <option value="Midnight">Midnight</option>
                      <option value="Starlight">Starlight</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Webcam</label>
                    <select 
                      name="webcam" 
                      className="w-full h-11 rounded-lg border border-gray-200 px-4"
                      defaultValue={editingLaptop?.webcam || ''}
                    >
                      <option value="">Select Webcam</option>
                      <option value="720p HD">720p HD</option>
                      <option value="1080p FHD">1080p FHD</option>
                      <option value="1080p FHD IR">1080p FHD with IR</option>
                      <option value="5MP">5MP</option>
                      <option value="12MP">12MP (Center Stage)</option>
                      <option value="None">None</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Keyboard</label>
                    <select 
                      name="keyboard" 
                      className="w-full h-11 rounded-lg border border-gray-200 px-4"
                      defaultValue={editingLaptop?.keyboard || ''}
                    >
                      <option value="">Select Keyboard</option>
                      <option value="Standard">Standard</option>
                      <option value="Backlit">Backlit</option>
                      <option value="RGB Backlit">RGB Backlit</option>
                      <option value="Backlit with Numpad">Backlit with Numpad</option>
                      <option value="Mechanical">Mechanical</option>
                      <option value="Touch Bar">Touch Bar</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">WiFi</label>
                    <select 
                      name="wifi" 
                      className="w-full h-11 rounded-lg border border-gray-200 px-4"
                      defaultValue={editingLaptop?.wifi || ''}
                    >
                      <option value="">Select WiFi</option>
                      <option value="WiFi 5 (802.11ac)">WiFi 5 (802.11ac)</option>
                      <option value="WiFi 6 (802.11ax)">WiFi 6 (802.11ax)</option>
                      <option value="WiFi 6E">WiFi 6E</option>
                      <option value="WiFi 7">WiFi 7</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Bluetooth</label>
                    <select 
                      name="bluetooth" 
                      className="w-full h-11 rounded-lg border border-gray-200 px-4"
                      defaultValue={editingLaptop?.bluetooth || ''}
                    >
                      <option value="">Select Bluetooth</option>
                      <option value="Bluetooth 5.0">Bluetooth 5.0</option>
                      <option value="Bluetooth 5.1">Bluetooth 5.1</option>
                      <option value="Bluetooth 5.2">Bluetooth 5.2</option>
                      <option value="Bluetooth 5.3">Bluetooth 5.3</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Weight</label>
                    <select 
                      name="weight" 
                      className="w-full h-11 rounded-lg border border-gray-200 px-4"
                      defaultValue={editingLaptop?.weight || ''}
                    >
                      <option value="">Select Weight</option>
                      <option value="Under 1kg">Under 1kg</option>
                      <option value="1.0 - 1.3 kg">1.0 - 1.3 kg</option>
                      <option value="1.3 - 1.5 kg">1.3 - 1.5 kg</option>
                      <option value="1.5 - 1.8 kg">1.5 - 1.8 kg</option>
                      <option value="1.8 - 2.0 kg">1.8 - 2.0 kg</option>
                      <option value="2.0 - 2.5 kg">2.0 - 2.5 kg</option>
                      <option value="2.5 - 3.0 kg">2.5 - 3.0 kg</option>
                      <option value="Over 3kg">Over 3kg</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Warranty</label>
                    <select 
                      name="warranty" 
                      className="w-full h-11 rounded-lg border border-gray-200 px-4"
                      defaultValue={editingLaptop?.warranty || ''}
                    >
                      <option value="">Select Warranty</option>
                      <option value="No Warranty">No Warranty</option>
                      <option value="3 Months">3 Months</option>
                      <option value="6 Months">6 Months</option>
                      <option value="1 Year">1 Year</option>
                      <option value="2 Years">2 Years</option>
                      <option value="3 Years">3 Years</option>
                    </select>
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Ports (comma separated)</label>
                    <Input 
                      name="ports" 
                      defaultValue={editingLaptop?.ports}
                      placeholder="e.g. USB-C x2, USB-A x1, HDMI, SD Card, Audio Jack"
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Dimensions</label>
                    <Input 
                      name="dimensions" 
                      defaultValue={editingLaptop?.dimensions}
                      placeholder="e.g. 344 x 230 x 18 mm"
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <Textarea 
                      name="description" 
                      defaultValue={editingLaptop?.description}
                      placeholder="Detailed description of the laptop for the product page..."
                      rows={4}
                    />
                  </div>
                  
                  <div className="col-span-2 border-t border-gray-200 pt-4 mt-2">
                    <h4 className="text-sm font-semibold text-[var(--anchor-dark)] mb-4">Media & Status</h4>
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Image</label>
                    <div className="flex items-center gap-4">
                      <label className="flex-1 border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-pointer hover:border-[var(--vermilion)] transition-colors">
                        <input 
                          type="file" 
                          name="image" 
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                        <div className="flex items-center justify-center gap-2 text-gray-500">
                          <Upload size={20} />
                          <span>Click to upload image</span>
                        </div>
                      </label>
                      {imagePreview && (
                        <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                          <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Notes</label>
                    <Textarea 
                      name="notes" 
                      defaultValue={editingLaptop?.notes}
                      placeholder="Additional details about this laptop..."
                      rows={3}
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="featured" 
                        value="true"
                        defaultChecked={!!editingLaptop?.featured}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      <span className="text-sm font-medium">Featured on homepage</span>
                    </label>
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <Button type="submit" variant="primary" disabled={loading} className="flex-1">
                    <Save size={18} className="mr-2" />
                    {loading ? 'Saving...' : 'Save Laptop'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => { setShowForm(false); resetFormState(); }}>
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Laptops Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {laptops.length === 0 ? (
            <div className="p-12 text-center">
              <Laptop size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 mb-4">No laptops yet. Add your first laptop!</p>
              <Button variant="primary" onClick={() => { setShowForm(true); resetFormState(); }}>
                <Plus size={18} className="mr-2" />
                Add Laptop
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-gray-500">Image</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-500">Name</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-500">Price</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-500">Status</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-500">Featured</th>
                    <th className="text-right p-4 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {laptops.map((laptop) => (
                    <tr key={laptop.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="p-4">
                        <div className="w-16 h-12 rounded bg-gray-100 overflow-hidden">
                          {laptop.image ? (
                            <img src={laptop.image} alt={laptop.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Laptop size={20} className="text-gray-300" />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="font-medium text-[var(--anchor-dark)]">{laptop.name}</p>
                        <p className="text-sm text-gray-500">{laptop.cpu}</p>
                      </td>
                      <td className="p-4">
                        <p className="font-semibold text-[var(--vermilion)]">
                          {formatPrice(laptop.price)} {laptop.currency}
                        </p>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          laptop.stock_status === 'In Stock' 
                            ? 'bg-green-100 text-green-700'
                            : laptop.stock_status === 'Limited'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {laptop.stock_status}
                        </span>
                      </td>
                      <td className="p-4">
                        {laptop.featured ? (
                          <span className="text-[var(--vermilion)]">★</span>
                        ) : (
                          <span className="text-gray-300">☆</span>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => handleEdit(laptop)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <Edit size={18} className="text-gray-500" />
                          </button>
                          <button 
                            onClick={() => handleDelete(laptop.id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} className="text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
