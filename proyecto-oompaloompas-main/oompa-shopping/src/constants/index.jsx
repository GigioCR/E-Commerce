import laptop from '../assets/laptops.webp'
import lenovo from '../assets/Lenovo.webp'
import phone from '../assets/phonearray.webp'
import phoneProduct from '../assets/phone.jpg'
import macbook from '../assets/macbook.png'
import lenovoTablet from '../assets/lenovotab.webp'
import eldenRing from '../assets/juegops5.jpg'
import samsungGalaxy from '../assets/galaxy.webp'
import ipad from '../assets/mini.jpg'
import hp from '../assets/hp.jpeg'
import usbAdapter from '../assets/usb.webp'
import paypal from '../assets/paypal.jpg'
import m3 from '../assets/m3.jpg'
import homepage1 from '../assets/homepage1.png'
import homepage2 from '../assets/homepage2.jpg'
import eldenringhome from '../assets/eldenringhome.jpg'
import rl from '../assets/rl.webp'

export {
  laptop,
  lenovo,
  phone,
  phoneProduct,
  macbook,
  lenovoTablet,
  eldenRing,
  samsungGalaxy,
  ipad,
  hp,
  usbAdapter,
  paypal,
  homepage1,
  homepage2,
  eldenringhome,
  rl
};

export const navItems = [
  { label: "Shop", href: "/shopAll" },
  // { label: "About", href: "/AboutUs" },
  // { label: "Contact", href: "/Contact" },
  { label: "Orders", href: "/Orders" },
];

export const slides = [
  { id: 1, image: laptop, alt: 'New Laptops' },
  { id: 2, image: phone, alt: 'New Phones' },
];

export const sampleProducts = [
  {
    id: 1, imageUrl: phoneProduct, title: "IPhone 16", price: 999.99, type: "Cellphone", onSale: true, newProduct: true,
    description: "Experience the future of smartphones with the iPhone 16. Featuring a stunning display, powerful A16 chip, and advanced camera system.",
    specifications: {
      "Operating System": "IOS",
      "Display": "6.7-inch Super Retina XDR",
      "Chip": "A16 Bionic",
      "Cellular Technology": "5G",
      "Ram Memory Installed Size": "8 GB",
      "Camera": "Triple 12MP camera system",
      "Storage": "128GB"
    }
  },
  {
    id: 2, imageUrl: lenovo, title: "Lenovo Notebook IdeaPad 1", price: 799.99, type: "Laptop", onSale: false, newProduct: false,
    description: "The Lenovo IdeaPad 1 15AMN7 offers a 15.6-inch display, powered by a Ryzen 3 CPU and 8GB RAM. With 256GB of storage, Windows 11 Home, and integrated HD graphics, this portable and stylish laptop in Abyss Blue is perfect for everyday use.",
    specifications: {
      "Brand": "Lenovo",
      "Model Name": "IdeaPad 1 15AMN7",
      "Screen Size": "15.6 Inches",
      "Color": "Abyss Blue",
      "Hard Disk Size": "256 GB",
      "CPU Model": "Ryzen 3",
      "Ram Memory Installed Size": "8 GB",
      "Operating System": "Windows 11 Home",
      "Special Feature": "Portable, HD Graphics",
      "Graphics Card Description": "Integrated"
    }
  },
  {
    id: 3, imageUrl: m3, title: "MacBook Pro M3", price: 1599.99, type: "Laptop", onSale: false, newProduct: true,
    description: "The MacBook Pro features a sleek 14.2-inch display, powered by the Apple M3 chip and equipped with 8GB of RAM. With a 512GB SSD for storage and Mac OS as the operating system, this laptop in Space Gray combines style and performance with integrated Apple graphics.",
    specifications: {
      "Brand": "Apple",
      "Model Name": "MacBook Pro",
      "Screen Size": "14.2 Inches",
      "Color": "Space Gray",
      "Hard Disk Size": "512 GB",
      "CPU Model": "Apple M3",
      "Ram Memory Installed Size": "8 GB",
      "Operating System": "Mac OS",
      "Graphics Card Description": "Integrated",
      "Graphics Coprocessor": "Apple Integrated Graphics"
    }
  },
  {
    id: 4, imageUrl: lenovoTablet, title: "Lenovo Tab M10 Plus", price: 499.99, type: "Tablet", onSale: false, newProduct: false,
    description: "The Lenovo Tab M10 Plus features a 10.61-inch display with a resolution of 2000 x 1200 pixels. With 32GB of memory storage capacity, this tablet combines portability and performance for everyday use.",
    specifications: {
      "Brand": "Lenovo",
      "Model Name": "Tab M10 Plus 3rd Gen",
      "Memory Storage Capacity": "32 GB",
      "Screen Size": "10.61 Inches",
      "Display Resolution Maximum": "2000 x 1200 Pixels"
    }
  },
  {
    id: 5, imageUrl: eldenRing, title: "Elden Ring: SOTE PS5", price: 59.99, type: "Video Game", onSale: false, newProduct: false,
    description: "ELDEN RING, developed by FromSoftware Inc. and produced by BANDAI NAMCO Entertainment Inc., is a fantasy action-RPG and FromSoftware's largest game to date, set within a world full of mystery and peril.",
    specifications: {
      "DLC Included": "Elden Ring Base Game + Shadow of the Erdtree",
      "Console": "PS5",
      "Completion Playtime": "100 h"
    }
  },
  {
    id: 6, imageUrl: samsungGalaxy, title: "Samsung Galaxy S21 5G", price: 245.99, type: "Cellphone", onSale: false, newProduct: false,
    description: "The Samsung Galaxy S21 5G features a 6.4-inch display with a refresh rate of 120 Hz. Powered by a Snapdragon CPU running at 2.9 GHz and equipped with 6 GB of RAM, this smartphone offers 128 GB of storage and runs on Android 12.0. It is unlocked for any wireless carrier.",
    specifications: {
      "Brand": "SAMSUNG",
      "Operating System": "Android 12.0",
      "Ram Memory Installed Size": "6 GB",
      "CPU Model": "Snapdragon",
      "CPU Speed": "2.9 GHz",
      "Memory Storage Capacity": "128 GB",
      "Screen Size": "6.4 Inches",
      "Refresh Rate": "120 Hz",
      "Model Name": "Galaxy S21 FE",
      "Wireless Carrier": "Unlocked"
    }
  },
  {
    id: 7, imageUrl: ipad, title: "IPad Mini 6 256GB", price: 499.99, type: "Tablet", onSale: false, newProduct: true,
    description: "The full iPad experience designed to fit in one hand. With an 8.3-inch Liquid Retina display, powerful A15 Bionic chip, 12MP Ultra Wide front camera with Center Stage, USB-C connectivity, and ultrafast Wi-Fi. Take notes, mark up documents, and edit photos and videos.",
    specifications: {
      "Brand": "Apple",
      "Model Name": "iPad mini",
      "Memory Storage Capacity": "256 GB",
      "Screen Size": "8.3 Inches",
      "Display Resolution Maximum": "2266 x 1488 Pixels"
    }
  },
  {
    id: 8, imageUrl: hp, title: "HP Stream 14", price: 499.99, type: "Laptop", onSale: false, newProduct: false,
    description: "The HP Stream 14 is a sleek and stylish laptop featuring a 14-inch display, powered by a Pentium CPU with 16 GB of RAM. It comes with 512 GB of storage, runs on Windows 11 S, and has an anti-glare coating for comfortable viewing.",
    specifications: {
      "Brand": "HP",
      "Model Name": "HP Stream",
      "Screen Size": "14 Inches",
      "Color": "Silver",
      "Hard Disk Size": "512 GB",
      "CPU Model": "Pentium",
      "Ram Memory Installed Size": "16 GB",
      "Operating System": "Windows 11 S",
      "Special Feature": "Anti Glare Coating",
      "Graphics Card Description": "Integrated"
    }
  },
  {
    id: 9, imageUrl: usbAdapter, title: "USB Type-A to USB Type-C 1.5 m Data Sync and Charging Cable", price: 7.99, type: "Other", onSale: false, newProduct: false,
    description: "This USB Type-A to USB Type-C cable is designed for efficient data transfer and charging. Measuring 1.5 meters in length, it provides flexibility and convenience for connecting your devices. The cable features a sleek black color, durable construction, and supports fast charging capabilities.",
    specifications: {
      "Color": "Black",
      "Length": "1.5 meters",
      "Connector Type": "USB Type-A to USB Type-C",
      "Data Transfer Rate": "Up to 480 Mbps",
      "Charging Speed": "Supports fast charging",
      "Material": "Durable plastic"
    }
  },
];

export const current_items = [

];

export const footerItems = [
  { title: "WonkaTech", link: "/", description: "San Pedro, Montes de Oca, Universidad de Rica, ECCI +506 XXXX-XXXX" },
  {
    title: "Shop", link: "/shopAll", description: ""
  },
  { title: "Privacy Policy", link: "/Terms", description: "" },
  { title: "About Us", link: "/AboutUs", description: "" },
  { title: "Contact Us", link: "/Contact", description: "" },
];