import { useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Camera, Upload } from 'lucide-react';

interface PhotoUploadProps {
  onPhotoSelect: (file: File) => void;
  questionId: string;
}

export const PhotoUpload = ({ onPhotoSelect, questionId }: PhotoUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onPhotoSelect(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept={isMobile ? "image/*;capture=camera" : "image/*"}
        capture={isMobile ? "environment" : undefined}
        onChange={handleFileSelect}
        className="hidden"
        ref={fileInputRef}
        id={`photo-upload-${questionId}`}
      />
      
      <div className="flex gap-2">
        <Button
          type="button"
          variant="secondary"
          className="w-full touch-target"
          onClick={handleCameraClick}
        >
          {isMobile ? (
            <>
              <Camera className="mr-2 h-4 w-4" />
              Take Photo
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload Photo
            </>
          )}
        </Button>
      </div>

      {preview && (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
          <img
            src={preview}
            alt="Preview"
            className="h-full w-full object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={() => {
              setPreview(null);
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
            }}
          >
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};
