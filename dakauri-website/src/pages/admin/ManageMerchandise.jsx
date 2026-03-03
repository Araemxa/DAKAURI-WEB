import React, { useState, useEffect } from 'react';
import ManageContent from '../../components/admin/ManageContent';
import AdminLayout from '../../components/admin/AdminLayout';
import { merchandiseAPI } from '../../services/api';
import toast from 'react-hot-toast';

const ManageMerchandise = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await merchandiseAPI.getAll();
        setData(result);
      } catch (error) {
        console.error('Error fetching merchandise:', error);
        toast.error('Gagal memuat data merchandise');
      }
    };
    fetchData();
  }, []);

  const fields = [
    {
      name: 'name',
      label: 'Nama Produk',
      type: 'text',
      required: true,
      searchable: true,
      placeholder: 'Masukkan nama produk'
    },
    {
      name: 'category',
      label: 'Kategori',
      type: 'select',
      required: true,
      options: [
        { value: 'pakaian', label: 'Pakaian' },
        { value: 'aksesoris', label: 'Aksesoris' },
        { value: 'tas', label: 'Tas' },
        { value: 'stiker', label: 'Stiker' },
        { value: 'lainnya', label: 'Lainnya' }
      ]
    },
    {
      name: 'price',
      label: 'Harga (Rp)',
      type: 'number',
      required: true,
      min: 0,
      placeholder: 'Masukkan harga',
      render: (value) => `Rp ${Number(value).toLocaleString('id-ID')}`
    },
    {
      name: 'stock',
      label: 'Stok',
      type: 'number',
      required: true,
      min: 0,
      placeholder: 'Masukkan jumlah stok'
    },
    {
      name: 'description',
      label: 'Deskripsi',
      type: 'textarea',
      required: true,
      searchable: true,
      fullWidth: true,
      placeholder: 'Masukkan deskripsi produk',
      rows: 4
    },
    {
      name: 'image',
      label: 'Gambar Produk',
      type: 'image',
      fullWidth: true
    },
    {
      name: 'is_active',
      label: 'Status',
      type: 'checkbox',
      checkboxLabel: 'Produk aktif dan ditampilkan'
    }
  ];

  const handleSave = async (item, action) => {
    try {
      if (action === 'create') {
        const result = await merchandiseAPI.create(item);
        setData(prev => [result, ...prev]);
      } else {
        const result = await merchandiseAPI.update(item.id, item);
        setData(prev => prev.map(d => d.id === item.id ? result : d));
      }
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Gagal menyimpan data');
      throw error;
    }
  };

  const handleDelete = async (item) => {
    try {
      await merchandiseAPI.delete(item.id);
      setData(prev => prev.filter(d => d.id !== item.id));
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Gagal menghapus data');
      throw error;
    }
  };

  return (
    <AdminLayout title="Kelola Merchandise">
      <ManageContent
        title="Kelola Merchandise"
        description="Kelola produk merchandise DAKAURI"
        fields={fields}
        initialData={data}
        onSave={handleSave}
        onDelete={handleDelete}
        itemName="Produk"
      />
    </AdminLayout>
  );
};

export default ManageMerchandise;
