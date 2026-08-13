"use client";

import { useState } from "react";
import {
  usePortfolioAdmin,
  useCreatePortfolioItem,
  useUpdatePortfolioItem,
  useDeletePortfolioItem,
} from "../_hooks/usePortfolioAdmin";
import { PortfolioItemForm } from "./PortfolioItemForm";
import { Button } from "@/shared/components/Button";
import { Modal } from "@/shared/components/Modal";
import { motion } from "framer-motion";
import type { PortfolioItem } from "@/app/portfolio/_hooks/usePortfolio";

export function PortfolioManager() {
  const { data: items, isLoading } = usePortfolioAdmin();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const deleteItem = useDeletePortfolioItem();

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      await deleteItem.mutateAsync(id);
    }
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setEditingItem(null);
  };

  if (isLoading) {
    return <div className="text-foreground/70">Loading...</div>;
  }

  return (
    <>
      <div className="mb-6">
        <Button onClick={() => setIsFormOpen(true)} variant="primary">
          Add New Portfolio Item
        </Button>
      </div>

      <div className="glass rounded-lg p-6">
        {!items || items.length === 0 ? (
          <p className="text-foreground/70 text-center py-8">
            No portfolio items yet
          </p>
        ) : (
          <div className="space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-foreground/70">
                    {item.category} • {item.featured ? "Featured" : "Regular"}
                  </p>
                </div>
                <div className="flex gap-2">
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
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={isFormOpen} onClose={handleClose} size="lg">
        <PortfolioItemForm item={editingItem} onClose={handleClose} />
      </Modal>
    </>
  );
}
