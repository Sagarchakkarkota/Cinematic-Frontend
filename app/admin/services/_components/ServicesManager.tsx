'use client'

import { useState } from 'react'
import { useServicesAdmin, useCreateService, useUpdateService, useDeleteService } from '../_hooks/useServicesAdmin'
import { ServiceForm } from './ServiceForm'
import { Button } from '@/shared/components/Button'
import { Modal } from '@/shared/components/Modal'
import { motion } from 'framer-motion'
import type { Service } from '@/app/services/_hooks/useServices'

export function ServicesManager() {
  const { data: services, isLoading } = useServicesAdmin()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const deleteService = useDeleteService()

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setIsFormOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      await deleteService.mutateAsync(id)
    }
  }

  const handleClose = () => {
    setIsFormOpen(false)
    setEditingService(null)
  }

  if (isLoading) {
    return <div className="text-foreground/70">Loading...</div>
  }

  return (
    <>
      <div className="mb-6">
        <Button onClick={() => setIsFormOpen(true)} variant="primary">
          Add New Service
        </Button>
      </div>

      <div className="glass rounded-lg p-6">
        {!services || services.length === 0 ? (
          <p className="text-foreground/70 text-center py-8">No services yet</p>
        ) : (
          <div className="space-y-4">
            {services.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{service.title}</h3>
                  <p className="text-sm text-foreground/70">
                    ₹{service.price.toLocaleString()} • {service.active ? 'Active' : 'Inactive'}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(service)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(service._id)}
                  >
                    Delete
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={isFormOpen} onClose={handleClose} size="lg">
        <ServiceForm
          service={editingService}
          onClose={handleClose}
        />
      </Modal>
    </>
  )
}
