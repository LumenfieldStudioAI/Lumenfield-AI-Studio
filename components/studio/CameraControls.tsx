"use client";
import { GlassDropdown } from "./GlassDropdown";
import { GENRES, STYLES, CAMERA_BODIES } from "@/lib/cinema-data";

interface CameraControlsProps {
  genre:          string;
  style:          string;
  camera:         string;
  onGenreChange:  (v: string) => void;
  onStyleChange:  (v: string) => void;
  onCameraChange: (v: string) => void;
}

export function CameraControls({
  genre, style, camera,
  onGenreChange, onStyleChange, onCameraChange,
}: CameraControlsProps) {
  return (
    <div className="flex items-center gap-1 px-3 py-2 flex-wrap">
      <GlassDropdown label="Genre"  value={genre}  options={GENRES}        onChange={onGenreChange} />
      <GlassDropdown label="Style"  value={style}  options={STYLES}        onChange={onStyleChange} />
      <GlassDropdown label="Camera" value={camera} options={CAMERA_BODIES} onChange={onCameraChange} />
    </div>
  );
}
