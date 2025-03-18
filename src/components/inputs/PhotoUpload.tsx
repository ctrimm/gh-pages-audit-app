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
  const cameraInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className="space-y-4">
      {/* Hidden file inputs */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        ref={fileInputRef}
        id={`photo-upload-${questionId}`}
      />
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
        ref={cameraInputRef}
        id={`photo-camera-${questionId}`}
      />
      
      {/* Split view buttons */}
      <div className="grid grid-cols-2 gap-2">
        <Button
          type="button"
          variant="secondary"
          className="w-full touch-target py-6 sm:py-4"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="mr-2 h-5 w-5 sm:h-4 sm:w-4" />
          <span className="text-base sm:text-sm">Attach File</span>
        </Button>
        <Button
          type="button"
          variant="secondary"
          className="w-full touch-target py-6 sm:py-4"
          onClick={() => cameraInputRef.current?.click()}
        >
          <Camera className="mr-2 h-5 w-5 sm:h-4 sm:w-4" />
          <span className="text-base sm:text-sm">Take Photo</span>
        </Button>
      </div>

      {/* Preview */}
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
              if (fileInputRef.current) fileInputRef.current.value = '';
              if (cameraInputRef.current) cameraInputRef.current.value = '';
            }}
          >
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};
