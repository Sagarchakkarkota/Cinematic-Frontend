"use client";

import Link from "next/link";
import { usePortfolio } from "../portfolio/_hooks/usePortfolio";
import { useServices } from "../services/_hooks/useServices";
import { useHeroMedia } from "../_hooks/useHeroMedia";
import { FilmProject } from "./FilmProject";
import { BackgroundScene } from "./BackgroundScene";
import {
  FilmSkeleton,
  ServiceSkeleton,
  Skeleton,
} from "@/shared/components/Skeleton";

export function CinematicHome() {
  const { data: portfolio, isLoading: portfolioLoading } = usePortfolio();
  const { data: services, isLoading: servicesLoading } = useServices();
  const { data: media } = useHeroMedia();
  const films = (portfolio || []).sort((a, b) => a.order - b.order);
  const activeMedia = (media || [])
    .filter((item) => item.isActive)
    .sort((a, b) => a.order - b.order);
  const sceneVideo = activeMedia.find((item) => item.type === "video");
  const visibleFilms = films.slice(0, 4);
  const visibleServices = (services || [])
    .filter((service) => service.active)
    .sort((a, b) => a.order - b.order);

  return (
    <>
      <section className="cinema-intro section-dark lazy-panel">
        <div className="scene-index">01 / 06</div>
        <p className="eyebrow">The work of Utsavam</p>
        <h2>
          I don&apos;t just
          <br />
          capture images.
          <br />
          <em>I capture moments.</em>
        </h2>
      </section>

      <section
        className="films-section section-pad deferred-section lazy-panel"
        id="films"
      >
        <div className="section-kicker">02 — selected films</div>
        <div className="films-heading">
          <h2>
            Stories in
            <br />
            <em>motion.</em>
          </h2>
          <p>
            Every film begins with a feeling and ends somewhere you can return
            to.
          </p>
        </div>
        <div className="films-list">
          {portfolioLoading ? (
            [0, 1, 2].map((item) => <FilmSkeleton key={item} />)
          ) : visibleFilms.length ? (
            visibleFilms.map((item, index) => (
              <FilmProject item={item} index={index} key={item._id} />
            ))
          ) : (
            <p className="empty-note">
              Films from the studio will appear here.
            </p>
          )}
        </div>
      </section>

      <section
        className="film-strip deferred-section lazy-panel"
        data-horizontal-strip
      >
        <div className="film-strip-heading">
          <span>03 — the reel</span>
          <span>Keep scrolling ↗</span>
        </div>
        <div className="film-strip-track" data-horizontal-track>
          {portfolioLoading
            ? [0, 1, 2, 3].map((item) => (
                <div className="strip-item pulse-surface" key={item}>
                  <Skeleton className="h-44 w-full rounded-none" />
                  <Skeleton className="mt-3 h-3 w-16 rounded-full" />
                  <Skeleton className="mt-3 h-5 w-2/3 rounded-full" />
                </div>
              ))
            : (visibleFilms.length ? visibleFilms : []).map((item, index) => (
                <Link
                  href="/portfolio"
                  data-cursor="cursor-view"
                  className="strip-item"
                  key={item._id}
                >
                  <div className="strip-image">
                    <img
                      loading="lazy"
                      decoding="async"
                      src={item.thumbnailUrl || "/goldenFeather.png"}
                      alt={item.title}
                    />
                  </div>
                  <span>FILM {String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                </Link>
              ))}
          {!portfolioLoading && !visibleFilms.length && (
            <div className="strip-item strip-placeholder">
              <div className="strip-image">
                <Skeleton className="h-full w-full rounded-none" />
              </div>
              <span>UTSAVAM / REEL</span>
              <h3>Coming soon</h3>
            </div>
          )}
        </div>
      </section>

      <section className="full-scene lazy-panel" data-parallax="-10">
        <BackgroundScene
          src={sceneVideo?.url}
          fallbackClass="full-scene-fallback"
          preload="metadata"
        />
        <div className="full-scene-overlay" />
        <h2>
          Every frame
          <br />
          <em>has a story.</em>
        </h2>
      </section>

      <section
        className="services-editorial section-pad deferred-section lazy-panel"
        id="services"
      >
        <div className="section-kicker">04 — what we make</div>
        <h2>
          Made for
          <br />
          <em>meaning.</em>
        </h2>
        <div className="service-rows">
          {servicesLoading
            ? [0, 1, 2, 3, 4, 5].map((item) => <ServiceSkeleton key={item} />)
            : visibleServices.length
              ? visibleServices.map((service, index) => (
                  <Link
                    href="/services"
                    className="service-row"
                    data-cursor="cursor-view"
                    key={service._id}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{service.title}</h3>
                    <span>↗</span>
                  </Link>
                ))
              : [
                  "Cinematography",
                  "Wedding films",
                  "Commercial films",
                  "Music videos",
                  "Documentary",
                  "Brand stories",
                ].map((title, index) => (
                  <Link
                    href="/services"
                    className="service-row"
                    data-cursor="cursor-view"
                    key={title}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{title}</h3>
                    <span>↗</span>
                  </Link>
                ))}
        </div>
      </section>

      <section className="about-editorial section-pad lazy-panel" id="about">
        <div className="about-image" data-parallax="-7">
          <img
            loading="lazy"
            decoding="async"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=85"
            alt="Utsavam cinematographer"
          />
        </div>
        <div className="about-copy">
          <div className="section-kicker">05 — behind the camera</div>
          <h2>
            Behind
            <br />
            <em>the camera.</em>
          </h2>
          <p>
            We are a small cinematography studio drawn to honest gestures, good
            light and the stories that stay with you long after the celebration
            ends.
          </p>
          <Link href="/about" className="arrow-link">
            Meet the studio <span>↗</span>
          </Link>
        </div>
      </section>

      <section className="contact-scene lazy-panel">
        <BackgroundScene
          src={sceneVideo?.url}
          fallbackClass="contact-scene-fallback"
        />
        <div className="full-scene-overlay" />
        <div className="contact-copy">
          <span className="section-kicker">06 — the final scene</span>
          <h2>
            Let&apos;s create
            <br />
            <em>
              something worth
              <br />
              remembering.
            </em>
          </h2>
          <Link href="/booking" className="button button-light">
            Start a project <span>↗</span>
          </Link>
          <div className="contact-meta">
            <span>info@utsavam.com</span>
            <span>Instagram ↗</span>
            <span>India / worldwide</span>
          </div>
        </div>
      </section>
    </>
  );
}
