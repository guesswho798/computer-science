from PIL import Image, ImageChops

im1 = Image.open("im1.jpg")
im2 = Image.open("im2.jpg")
im3 = Image.open("im3.png")
im4 = Image.open("im4.png")


diff = ImageChops.difference(im3, im4)

print(diff.getbbox())
diff.show()