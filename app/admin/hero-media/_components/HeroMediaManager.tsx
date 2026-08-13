'use client'

import { useState } from 'react'
import { useHeroMediaAdmin, useCreateHeroMedia, useUpdateHeroMedia, useDeleteHeroMedia } from '../_hooks/useHeroMediaAdmin'
import { HeroMediaForm } from './HeroMediaForm'
import { Button } from '@/shared/components/Button'
import { Modal } from '@/shared/components/Modal'
import { motion } from 'framer-motion'
import type { HeroMedia } from '@/app/_hooks/useHeroMedia'

export function HeroMediaManager() {
  const { data: media, isLoading } = useHeroMediaAdmin()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingMedia, setEditingMedia] = useState<HeroMedia | null>(null)
  const deleteMedia = useDeleteHeroMedia()

  const handleEdit = (item: HeroMedia) => {
    setEditingMedia(item)
    setIsFormOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this media?')) {
      await deleteMedia.mutateAsync(id)
    }
  }

  const handleClose = () => {
    setIsFormOpen(false)
    setEditingMedia(null)
  }

  if (isLoading) {
    return <div className="text-foreground/70">Loading...</div>
  }

  return (
    <>
      <div className="mb-6">
        <Button onClick={() => setIsFormOpen(true)} variant="primary">
          Add New Hero Media
        </Button>
      </div>

      <div className="glass rounded-lg p-6 overflow-x-auto">
        {!media || media.length === 0 ? (
          <p className="text-foreground/70 text-center py-8">No hero media yet</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Type</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">URL</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Order</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {media.map((item, index) => (
                <motion.tr
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                >
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      item.type === 'video' 
                        ? 'bg-secondary/20 text-secondary' 
                        : 'bg-primary/20 text-primary'
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-secondary hover:text-accent truncate max-w-md block"
                    >
                      {item.url}
                    </a>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      item.isActive 
                        ? 'bg-secondary/20 text-secondary' 
                        : 'bg-foreground/20 text-foreground/70'
                    }`}>
                      {item.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-foreground/70">{item.order}</td>
                  <td className="py-3 px-4">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal isOpen={isFormOpen} onClose={handleClose} size="lg">
        <HeroMediaForm
          media={editingMedia}
          onClose={handleClose}
        />
      </Modal>
    </>
  )
}
