from PIL import Image, ImageDraw, ImageFont
import numpy as np, os
from scipy.ndimage import binary_propagation

SHEETS = [
  {
    'file':'my_assets/Chalk-Style Animal and Brain Icon Grid.png',
    'cols':3,'rows':3,
    'names':['animal_dog','animal_cat','animal_poodle','animal_spider','animal_human','animal_ape','animal_hospital','animal_ear','animal_brain'],
  },
  {
    'file':'my_assets/Pastel Emoji Expression Grid.png',
    'cols':3,'rows':2,
    'names':['face_neutral','face_happy','face_fear','face_sad','face_anger','face_surprise'],
  },
  {
    'file':'my_assets/Pastel Doodle Icon Grid.png',
    'cols':3,'rows':2,
    'names':['tech_turtle','tech_rifle','tech_patch','tech_noise','tech_marker','tech_gate'],
  },
  {
    'file':'my_assets/Playful Pastel Doodle Sticker Grid.png',
    'cols':3,'rows':3,
    'names':['icon_toaster','icon_volcano','icon_piggy','icon_cake','icon_cloud','icon_coffee','icon_palette','icon_glitch','icon_calendar'],
  },
  {
    'file':'my_assets/Superhero Sticker Sheet with Cat Mask and Apple.png',
    'cols':2,'rows':2,
    'names':['hero_mask','hero_costume','cat_mask','apple_clean'],
  },
]

outdir='public/source/icons'
os.makedirs(outdir, exist_ok=True)
produced=[]
for sh in SHEETS:
    im=Image.open(sh['file']).convert('RGBA')
    W,H=im.size
    bg=np.array([41,43,57],dtype=np.float32)
    for r in range(sh['rows']):
        for c in range(sh['cols']):
            x0=round(c*W/sh['cols']); x1=round((c+1)*W/sh['cols'])
            y0=round(r*H/sh['rows']); y1=round((r+1)*H/sh['rows'])
            cell=im.crop((x0,y0,x1,y1))
            arr=np.array(cell).astype(np.float32)
            dist=np.linalg.norm(arr[:,:,:3]-bg,axis=2)
            bgmask=dist < 12.0
            seed=np.zeros_like(bgmask,dtype=bool)
            seed[0,:]=bgmask[0,:]; seed[-1,:]=bgmask[-1,:]
            seed[:,0]=bgmask[:,0]; seed[:,-1]=bgmask[:,-1]
            outside=binary_propagation(seed,mask=bgmask)
            alpha=np.ones(dist.shape,dtype=np.float32)
            alpha[outside]=0.0
            arr[:,:,3]=alpha*255
            out=Image.fromarray(arr.astype(np.uint8),'RGBA')
            bbox=out.getbbox()
            if bbox:
                pad=10
                bbox=(max(0,bbox[0]-pad),max(0,bbox[1]-pad),min(out.width,bbox[2]+pad),min(out.height,bbox[3]+pad))
                out=out.crop(bbox)
            name=sh['names'][r*sh['cols']+c]
            path=f'{outdir}/{name}.png'
            out.save(path)
            produced.append((name,path,out.size))

# contact sheet on dark bg
cell_w,cell_h=260,260
cols=6; rows=(len(produced)+cols-1)//cols
sheet=Image.new('RGB',(cols*cell_w, rows*cell_h),(40,42,54))
d=ImageDraw.Draw(sheet)
try: font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',18)
except: font=ImageFont.load_default()
for i,(name,path,size) in enumerate(produced):
    im=Image.open(path).convert('RGBA')
    im.thumbnail((220,215), Image.LANCZOS)
    cx=(i%cols)*cell_w+cell_w//2; cy=(i//cols)*cell_h+cell_h//2-10
    sheet.paste(im,(cx-im.width//2, cy-im.height//2),im)
    d.text((cx-70, (i//cols)*cell_h+235), name, font=font, fill=(200,200,210))
sheet.save('/tmp/icon_contact.png')
print('produced',len(produced))
for n,p,s in produced: print(n,s)
