"use client";

import { useState, useEffect } from "react";
import {
  useCreatePortfolioItem,
  useUpdatePortfolioItem,
} from "../_hooks/usePortfolioAdmin";
import { Input } from "@/shared/components/Input";
import { Textarea } from "@/shared/components/Textarea";
import { Button } from "@/shared/components/Button";
import { useToast } from "@/shared/hooks/useToast";
import { Toast } from "@/shared/components/Toast";
import type { PortfolioItem } from "@/app/portfolio/_hooks/usePortfolio";

interface PortfolioItemFormProps {
  item?: PortfolioItem | null;
  onClose: () => void;
}

export function PortfolioItemForm({ item, onClose }: PortfolioItemFormProps) {
  const [formData, setFormData] = useState<any>({
    title: "",
    description: "",
    videoUrl: "",
    thumbnailUrl: "",
    category: "wedding" as const,
    featured: false,
    order: 0,
  });

  const createItem = useCreatePortfolioItem();
  const updateItem = useUpdatePortfolioItem();
  const { toast, showToast, hideToast } = useToast();

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title || "",
        description: item.description || "",
        videoUrl: item.videoUrl || "",
        thumbnailUrl: item.thumbnailUrl || "",
        category: item.category || "wedding",
        featured: item.featured || false,
        order: item.order || 0,
      });
    }
  }, [item]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (item) {
        await updateItem.mutateAsync({ id: item._id, data: formData });
        showToast("Portfolio item updated successfully", "success");
      } else {
        await createItem.mutateAsync(formData);
        showToast("Portfolio item created successfully", "success");
      }
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (error) {
      showToast("Failed to save. Please try again.", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold text-foreground mb-4">
        {item ? "Edit Portfolio Item" : "Add Portfolio Item"}
      </h2>

      <Input
        label="Title *"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        required
      />

      <Textarea
        label="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        rows={3}
      />

      <Input
        label="Video URL *"
        value={formData.videoUrl}
        onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
        required
        placeholder="https://..."
      />

      <Input
        label="Thumbnail URL"
        value={formData.thumbnailUrl}
        onChange={(e) =>
          setFormData({ ...formData, thumbnailUrl: e.target.value })
        }
        placeholder="https://..."
      />

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Category *
        </label>
        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value as any })
          }
          className="w-full px-4 py-3 bg-muted border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
          required
        >
          <option value="wedding">Wedding</option>
          <option value="pre-wedding">Pre-Wedding</option>
          <option value="reception">Reception</option>
          <option value="engagement">Engagement</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) =>
              setFormData({ ...formData, featured: e.target.checked })
            }
            className="w-4 h-4 rounded border-border text-secondary focus:ring-secondary"
          />
          <span className="text-sm text-foreground">Featured</span>
        </label>
      </div>

      <Input
        label="Order"
        type="number"
        value={formData.order}
        onChange={(e) =>
          setFormData({ ...formData, order: parseInt(e.target.value) || 0 })
        }
      />

      <div className="flex gap-4 pt-4">
        <Button
          type="submit"
          variant="primary"
          className="flex-1"
          disabled={createItem.isPending || updateItem.isPending}
        >
          {createItem.isPending || updateItem.isPending ? "Saving..." : "Save"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="flex-1"
        >
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
  );
}
