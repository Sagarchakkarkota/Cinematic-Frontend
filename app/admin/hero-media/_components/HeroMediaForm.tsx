'use client'

import { useState, useEffect } from 'react'
import { useCreateHeroMedia, useUpdateHeroMedia } from '../_hooks/useHeroMediaAdmin'
import { Input } from '@/shared/components/Input'
import { Button } from '@/shared/components/Button'
import { useToast } from '@/shared/hooks/useToast'
import { Toast } from '@/shared/components/Toast'
import type { HeroMedia } from '@/app/_hooks/useHeroMedia'

interface HeroMediaFormProps {
  media?: HeroMedia | null
  onClose: () => void
}

export function HeroMediaForm({ media, onClose }: HeroMediaFormProps) {
  const [formData, setFormData] = useState({
    type: 'video' as 'video' | 'image',
    url: '',
    isActive: true,
    order: 0,
  })

  const createMedia = useCreateHeroMedia()
  const updateMedia = useUpdateHeroMedia()
  const { toast, showToast, hideToast } = useToast()

  useEffect(() => {
    if (media) {
      setFormData({
        type: media.type || 'video',
        url: media.url || '',
        isActive: media.isActive !== undefined ? media.isActive : true,
        order: media.order || 0,
      })
    }
  }, [media])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (media) {
        await updateMedia.mutateAsync({ id: media._id, data: formData })
        showToast('Hero media updated successfully', 'success')
      } else {
        await createMedia.mutateAsync(formData)
        showToast('Hero media created successfully', 'success')
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
        {media ? 'Edit Hero Media' : 'Add Hero Media'}
      </h2>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Type *
        </label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value as 'video' | 'image' })}
          className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
          required
        >
          <option value="video">Video</option>
          <option value="image">Image</option>
        </select>
      </div>

      <Input
        label="URL *"
        type="url"
        value={formData.url}
        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
        placeholder="https://..."
        required
      />

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isActive}
            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
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
        <Button type="submit" variant="primary" className="flex-1" disabled={createMedia.isPending || updateMedia.isPending}>
          {createMedia.isPending || updateMedia.isPending ? 'Saving...' : 'Save'}
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
