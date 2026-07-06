const mongoose = require('mongoose');

// Sub-document schema for variants (sizes, colors, SKUs)
const ProductVariantSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true, trim: true },
  color: String,
  size: String,
  priceModifier: { type: Number, default: 0 },
  stock: { type: Number, required: true, min: 0, default: 0 }
});

// Main product schema
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 150 },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, required: true, trim: true },
  basePrice: { type: Number, required: true, min: 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  brand: { type: String, required: true, trim: true },
  images: [{ type: String, required: true }],
  attributes: { type: Map, of: String }, // Flexible key-value pairs
  variants: [ProductVariantSchema], // Embedded subdocuments
  isFeatured: { type: Boolean, default: false },
  ratings: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 }
  }
}, { timestamps: true });

// --- INDEXES ---
// Text index for search, single field index for filtering
ProductSchema.index({ name: 'text', description: 'text', brand: 'text' });
ProductSchema.index({ category: 1 });

// --- VIRTUALS ---
ProductSchema.virtual('url').get(function() {
  return `/products/${this.slug}`;
});

module.exports = mongoose.model('Product', ProductSchema);
