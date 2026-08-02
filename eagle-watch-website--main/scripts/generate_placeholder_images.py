from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    import subprocess, sys
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', 'Pillow'])
    from PIL import Image, ImageDraw, ImageFont

out = Path(__file__).resolve().parent.parent / 'public' / 'images'
out.mkdir(parents=True, exist_ok=True)

def make_image(name, size, text):
    path = out / name
    img = Image.new('RGB', size, '#5b5b5b')
    draw = ImageDraw.Draw(img)
    try:
        font = ImageFont.truetype('arial.ttf', size[1] // 12)
    except Exception:
        font = ImageFont.load_default()
    bbox = draw.textbbox((0, 0), text, font=font)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    draw.rectangle([0, 0, size[0], size[1]], fill='#5b5b5b')
    draw.text(((size[0] - w) / 2, (size[1] - h) / 2), text, fill='white', font=font)
    img.save(path, quality=90)
    print(f'created {path}')

files = [
    ('field-electric-fence.jpg', (1600, 1067), 'field-electric-fence.jpg'),
    ('field-gate-cabling.jpg', (1600, 1067), 'field-gate-cabling.jpg'),
    ('field-technician-work.jpg', (1600, 1067), 'field-technician-work.jpg'),
    ('field-cctv-mount.jpg', (1600, 1067), 'field-cctv-mount.jpg'),
    ('og-cover.jpg', (1200, 630), 'og-cover.jpg'),
]

for name, size, text in files:
    make_image(name, size, text)
