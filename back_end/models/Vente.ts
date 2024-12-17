import mongoose, { Schema, Document } from 'mongoose';

export interface IVente extends Document {
  id: string;
  somme: number;
  idProduits: string[];
  date: Date;
}

const VenteSchema: Schema = new Schema({
  id: { type: String, required: true },
  somme: { type: Number, required: true },
  idProduits: { type: [String], required: true },
  date: { type: Date, default: Date.now },
});

const Vente = mongoose.model<IVente>('Vente', VenteSchema);
export default Vente;
