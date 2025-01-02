from PIL import Image

# Load the image
img = Image.open("./icons/thumb_original.png")

# Resize and save as 48x48
img.resize((48, 48)).save("./icons/icon-48.png")

# Resize and save as 96x96
img.resize((96, 96)).save("./icons/icon-96.png")
