"""Make the web versions of every photo in public/images.

For each public/images/NAME.jpg this writes:
  public/images/NAME.webp      max 1600x1200px, for big photos on computers (heroes, galleries)
  public/images/sm/NAME.webp   max 800px, for cards, thumbnails and phones
and shrinks the .jpg itself to max 1200px (it is only used for WhatsApp/Facebook previews).

Run after adding a photo:  python3 scripts/optimize-images.py
Needs Pillow:              pip install Pillow
Files that are already done are skipped (add --force to redo all).
"""
import sys
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent / 'public' / 'images'
FORCE = '--force' in sys.argv
FULL, SMALL, JPG = (1600, 1200), (800, 800), (1200, 1200)


def save_webp(im, size, out, quality):
    copy = im.copy()
    copy.thumbnail(size, Image.LANCZOS)
    copy.save(out, 'WEBP', quality=quality, method=6)


for jpg in sorted(ROOT.glob('*.jpg')):
    full, small = jpg.with_suffix('.webp'), ROOT / 'sm' / (jpg.stem + '.webp')
    if not FORCE and full.exists() and small.exists() and full.stat().st_mtime >= jpg.stat().st_mtime:
        continue
    im = ImageOps.exif_transpose(Image.open(jpg)).convert('RGB')
    if im.width > JPG[0] or im.height > JPG[1] or jpg.stat().st_size > 400_000:
        preview = im.copy()
        preview.thumbnail(JPG, Image.LANCZOS)
        preview.save(jpg, 'JPEG', quality=80, optimize=True, progressive=True)
    small.parent.mkdir(exist_ok=True)
    save_webp(im, FULL, full, 72)
    save_webp(im, SMALL, small, 70)
    print('done', jpg.name)
