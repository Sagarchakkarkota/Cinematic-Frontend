'use client'

import { useState, useEffect } from 'react'
import { useCreateService, useUpdateService } from '../_hooks/useServicesAdmin'
import { Input } from '@/shared/components/Input'
import { Textarea } from '@/shared/components/Textarea'
import { Button } from '@/shared/components/Button'
import { useToast } from '@/shared/hooks/useToast'
import { Toast } from '@/shared/components/Toast'
import type { Service } from '@/app/services/_hooks/useServices'

interface ServiceFormProps {
  service?: Service | null
  onClose: () => void
}

export function ServiceForm({ service, onClose }: ServiceFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    duration: '',
    features: [] as string[],
    order: 0,
    active: true,
  })
  const [featureInput, setFeatureInput] = useState('')

  const createService = useCreateService()
  const updateService = useUpdateService()
  const { toast, showToast, hideToast } = useToast()

  useEffect(() => {
    if (service) {
      setFormData({
        title: service.title || '',
        description: service.description || '',
        price: service.price || 0,
        duration: service.duration || '',
        features: service.features || [],
        order: service.order || 0,
        active: service.active !== undefined ? service.active : true,
      })
    }
  }, [service])

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()],
      })
      setFeatureInput('')
    }
  }

  const handleRemoveFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (service) {
        await updateService.mutateAsync({ id: service._id, data: formData })
        showToast('Service updated successfully', 'success')
      } else {
        await createService.mutateAsync(formData)
        showToast('Service created successfully', 'success')
      }
      setTimeout(() => {
        onClose()
      }, 500)
    } catch (error) {
      showToast('Failed to save. Please try again.', 'error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold text-foreground mb-4">
        {service ? 'Edit Service' : 'Add Service'}
      </h2>

      <Input
        label="Title *"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />

      <Textarea
        label="Description *"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        rows={4}
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Price (₹) *"
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
          required
        />

        <Input
          label="Duration"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          placeholder="e.g., 2 hours"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Features
        </label>
        <div className="flex gap-2 mb-2">
          <Input
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleAddFeature()
              }
            }}
            placeholder="Add a feature and press Enter"
          />
          <Button type="button" onClick={handleAddFeature} variant="outline">
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.features.map((feature, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary/20 text-secondary rounded-full text-sm flex items-center gap-2"
            >
              {feature}
              <button
                type="button"
                onClick={() => handleRemoveFeature(index)}
                className="text-foreground/70 hover:text-foreground"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.active}
            onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
            className="w-4 h-4 rounded border-border text-secondary focus:ring-secondary"
          />
          <span className="text-sm text-foreground">Active</span>
        </label>
      </div>

      <Input
        label="Order"
        type="number"
        value={formData.order}
        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
      />

      <div className="flex gap-4 pt-4">
        <Button type="submit" variant="primary" className="flex-1" disabled={createService.isPending || updateService.isPending}>
          {createService.isPending || updateService.isPending ? 'Saving...' : 'Save'}
        </Button>
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
      </div>
      <Toast
        message={toast.message}
        type={toast.type}
        isOpen={toast.isOpen}
        onClose={hideToast}
      />
    </form>
  )
}
