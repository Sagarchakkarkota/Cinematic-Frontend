"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { usePortfolio, type PortfolioItem } from "../_hooks/usePortfolio";
import { Modal } from "@/shared/components/Modal";
import { CardSkeleton } from "@/shared/components/Skeleton";

export function PortfolioGrid() {
  const { data: items, isLoading } = usePortfolio();
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  // 🔄 Loading skeleton
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => <CardSkeleton key={i} className="portfolio-skeleton" />)}
      </div>
    );
  }

  // 📭 Empty state
  if (!items || items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-foreground/70">No portfolio items available yet.</p>
      </div>
    );
  }

  return (
    <>
      {/* 🔲 GRID */}
      <div className="portfolio-collage" aria-label="Portfolio gallery">
        {items.map((item, index) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            onClick={() => setSelectedItem(item)}
            className={`portfolio-tile portfolio-tile-${index % 6} group cursor-pointer`}
          >
            <div className="relative h-full bg-muted rounded-lg overflow-hidden border border-border hover:border-secondary transition-colors">
              {/* 🖼️ Thumbnail */}
              {item.thumbnailUrl ? (
                <LazyPortfolioImage src={item.thumbnailUrl} alt={item.title} />
              ) : (
                <div className="w-full h-[300px] flex items-center justify-center bg-primary/20">
                  <svg
                    className="w-16 h-16 text-secondary/50"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}

              {/* 🌑 Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-foreground/70 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>

              {/* 🏷️ Category badge */}
              <div className="absolute top-4 right-4">
                <div className="bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-secondary">
                  {item.category}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🎬 MODAL */}
      <Modal
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        size="xl"
      >
        {selectedItem && (
          <div className="p-6">
            <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">
              {selectedItem.title}
            </h2>

            {selectedItem.description && (
              <p className="text-foreground/70 mb-6">
                {selectedItem.description}
              </p>
            )}

            <div className="bg-muted rounded-lg overflow-hidden">
              <video
                src={selectedItem.videoUrl}
                controls
                autoPlay
                className="w-full h-auto max-h-[80vh]"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

function LazyPortfolioImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <>
      {!loaded && !failed && <span className="portfolio-image-skeleton" aria-hidden="true" />}
      {failed ? (
        <div className="portfolio-image-fallback" aria-label="Image unavailable">Image unavailable</div>
      ) : (
        <img
          src={src}
          alt={alt}
          width={1200}
          height={900}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`portfolio-tile-image ${loaded ? "is-loaded" : ""}`}
        />
      )}
    </>
  );
}
