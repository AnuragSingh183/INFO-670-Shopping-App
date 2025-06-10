import firebase_admin
from firebase_admin import credentials, firestore
import random

# Initialize Firebase
cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

categories = {
    "Phones": [
        "iPhone 14 Pro", "Samsung Galaxy S23", "Google Pixel 7", "OnePlus 11", "iPhone 13 Mini",
        "Moto Edge 40", "Nothing Phone 1", "Xiaomi 13 Pro", "Realme GT Neo", "Sony Xperia 1 IV"
    ],
    "Laptops": [
        "MacBook Pro 16", "Dell XPS 13", "HP Spectre x360", "Lenovo Yoga 9i", "Asus ROG Zephyrus",
        "Acer Swift 5", "Microsoft Surface Laptop 5", "LG Gram", "Razer Blade 15", "Samsung Galaxy Book 3"
    ],
    "TVs": [
        "LG OLED CX", "Samsung QLED Q90T", "Sony Bravia X90J", "TCL 6-Series", "Vizio P-Series",
        "Hisense U7G", "Panasonic OLED HZ2000", "Mi QLED TV 4K", "OnePlus TV Q1", "Samsung Frame TV"
    ],
    "Earphones": [
        "AirPods Pro", "Sony WF-1000XM4", "Jabra Elite 75t", "Nothing Ear (2)", "OnePlus Buds Pro",
        "Realme Buds Air", "Samsung Galaxy Buds2", "Boat Airdopes 441", "Beats Studio Buds", "Sennheiser Momentum TW3"
    ],
    "Speakers": [
        "JBL Flip 6", "Sony SRS-XB33", "Bose SoundLink Revolve", "Marshall Emberton", "Anker Soundcore",
        "Ultimate Ears Boom 3", "Mi Portable Speaker", "Amazon Echo", "Apple HomePod Mini", "Zebronics BT Speaker"
    ]
}

image_links = {
    "Phones": "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg",
    "Laptops": "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg",
    "TVs": "https://images.pexels.com/photos/618613/pexels-photo-618613.jpeg",
    "Earphones": "https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg",
    "Speakers": "https://images.pexels.com/photos/374087/pexels-photo-374087.jpeg"
}

descriptions = {
    "Phones": "Latest smartphone with excellent camera and performance.",
    "Laptops": "Powerful laptop suitable for work and play.",
    "TVs": "Stunning 4K Ultra HD Smart TV with vibrant colors.",
    "Earphones": "Wireless earphones with noise cancellation.",
    "Speakers": "Portable Bluetooth speaker with deep bass."
}

def generate_price(category):
    return {
        "Phones": random.randint(400, 1200),
        "Laptops": random.randint(700, 2500),
        "TVs": random.randint(300, 2000),
        "Earphones": random.randint(30, 250),
        "Speakers": random.randint(40, 300)
    }[category]

for category, items in categories.items():
    for name in items:
        product = {
            "name": name,
            "price": generate_price(category),
            "discount": random.choice([5, 10, 15, 20]),
            "image": image_links[category],
            "rating": round(random.uniform(3.5, 5.0), 1),
            "description": descriptions[category],
            "category": category
        }

        db.collection("products").add(product)
        print(f"✅ Uploaded: {name} [{category}]")

print("✅ All products uploaded successfully.")
