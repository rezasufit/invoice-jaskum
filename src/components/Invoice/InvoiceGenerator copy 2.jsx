// InvoiceGenerator.jsx (sudah diberi prefix inv- untuk semua class)
import React, { useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import invoice from "../../api/invoice";
import "./InvoiceGenerator.css";
import jaskumLogo from "../../images/jaskum-logo.png";

export default function InvoiceGenerator() {
  const [nama, setNama] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState([]);
  const [catatan, setCatatan] = useState("");
  const [invoiceData, setInvoiceData] = useState(null);
  const invoiceRef = useRef(null);

  function formatRupiah(angka) {
    if (!angka) return "";
    const num = angka.toString().replace(/\D/g, "");
    const sisa = num.length % 3;
    let rupiah = num.substr(0, sisa);
    const ribuan = num.substr(sisa).match(/\d{3}/g);
    if (ribuan) {
      const separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }
    return rupiah ? "Rp " + rupiah : "";
  }

  function handleAddProduct() {
    if (!selectedProductId) return;
    const product = invoice.find((p) => p.id === parseInt(selectedProductId));
    if (!product) return;

    const exist = selectedInvoice.find((p) => p.id === product.id);
    if (exist) {
      setSelectedInvoice(
        selectedInvoice.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        )
      );
    } else {
      setSelectedInvoice([...selectedInvoice, { ...product, qty: 1 }]);
    }
  }

  function handleQtyChange(id, qty) {
    if (qty < 1) qty = 1;
    setSelectedInvoice(
      selectedInvoice.map((p) => (p.id === id ? { ...p, qty } : p))
    );
  }

  function handleRemoveProduct(id) {
    setSelectedInvoice(selectedInvoice.filter((p) => p.id !== id));
  }

  const totalHarga = selectedInvoice.reduce(
    (total, p) => total + p.price * p.qty,
    0
  );

  function generateInvoice() {
    if (!nama.trim() || selectedInvoice.length === 0) {
      alert("Mohon isi nama dan pilih minimal 1 produk");
      return;
    }

    const tanggal = new Date();
    const tanggalFormatted = tanggal.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    setInvoiceData({
      nama: nama.trim(),
      produk: selectedInvoice,
      totalHarga,
      catatan: catatan.trim() || "-",
      tanggalFormatted,
    });
  }

  function downloadPDF() {
    if (!invoiceRef.current || !invoiceData) return;

    const tanggal = new Date();
    const tanggalFilename = tanggal.toISOString().split("T")[0]; // Format yyyy-mm-dd

    // Buat nama file sesuai format
    const safeNama = invoiceData.nama.replace(/\s+/g, "_"); // Ganti spasi dengan underscore agar aman di filename
    const filename = `jaskum_${safeNama}_${tanggalFilename}.pdf`;

    const options = {
      margin: 0.3,
      filename: filename,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(invoiceRef.current).save();
  }

  const categories = [...new Set(invoice.map((p) => p.category))];

  return (
    <>
      <div className="inv-header">
        <img src={jaskumLogo} className="inv-logo" alt="Logo Jaskum" />
        <h2 className="inv-title">Buat Invoice Online</h2>
      </div>

      <form className="inv-form" onSubmit={(e) => e.preventDefault()}>
        <label className="inv-label">Nama Pelanggan</label>
        <input
          type="text"
          className="inv-input"
          placeholder="Masukkan nama pelanggan"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />

        <label className="inv-label">Pilih Produk/Jasa</label>
        <select
          className="inv-select"
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
        >
          <option value="">-- Pilih produk/jasa --</option>
          {categories.map((cat) => (
            <optgroup key={cat} label={cat}>
              {invoice
                .filter((p) => p.category === cat)
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({formatRupiah(p.price)})
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
        <button
          type="button"
          onClick={handleAddProduct}
          disabled={!selectedProductId}
          className="inv-btn-add"
        >
          Tambah Produk/Jasa
        </button>

        {selectedInvoice.length > 0 && (
          <table className="inv-table">
            <thead>
              <tr>
                <th>Produk/Jasa</th>
                <th>Harga Satuan</th>
                <th>Jumlah</th>
                <th>Subtotal</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {selectedInvoice.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td className="inv-text-right">{formatRupiah(p.price)}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={p.qty}
                      className="inv-input-qty"
                      onChange={(e) =>
                        handleQtyChange(p.id, parseInt(e.target.value) || 1)
                      }
                    />
                  </td>
                  <td className="inv-text-right">
                    {formatRupiah(p.price * p.qty)}
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleRemoveProduct(p.id)}
                      className="inv-btn-remove"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="inv-text-right inv-bold">
                  Total
                </td>
                <td className="inv-text-right inv-bold">
                  {formatRupiah(totalHarga)}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        )}

        <label className="inv-label">Catatan (opsional)</label>
        <textarea
          className="inv-textarea"
          placeholder="Masukkan catatan tambahan"
          value={catatan}
          onChange={(e) => setCatatan(e.target.value)}
          rows={3}
        />

        <div className="inv-btn-group">
          <button type="button" className="inv-btn" onClick={generateInvoice}>
            Buat Invoice
          </button>
          {invoiceData && (
            <button
              type="button"
              onClick={downloadPDF}
              className="inv-btn inv-btn-secondary"
            >
              Download PDF
            </button>
          )}
        </div>
      </form>

      <div
        className={`inv-container ${invoiceData ? "inv-show" : ""}`}
        ref={invoiceRef}
      >
        {invoiceData && (
          <>
            <div className="inv-header inv-space-between">
              <img className="inv-logo" src={jaskumLogo} alt="Logo Jaskum" />
              <div className="inv-header-details">
                <div className="inv-header-item">
                  <strong>Kepada:</strong> {invoiceData.nama}
                </div>
                <div className="inv-header-item">
                  Tanggal: {invoiceData.tanggalFormatted}
                </div>
              </div>
            </div>

            <table className="inv-table">
              <thead>
                <tr>
                  <th>Produk/Jasa</th>
                  <th>Harga Satuan</th>
                  <th>Jumlah</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.produk.map((p) => (
                  <tr key={p.id}>
                    <td>{p.name}</td>
                    <td className="inv-text-right">{formatRupiah(p.price)}</td>
                    <td className="inv-text-center">{p.qty}</td>
                    <td className="inv-text-right">
                      {formatRupiah(p.price * p.qty)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3" className="inv-text-right inv-bold">
                    Total
                  </td>
                  <td className="inv-text-right inv-bold">
                    {formatRupiah(invoiceData.totalHarga)}
                  </td>
                </tr>
              </tfoot>
            </table>

            <p className="inv-note">Catatan: {invoiceData.catatan}</p>
            <p className="inv-thanks">Terima kasih atas kepercayaan Anda!</p>
          </>
        )}
      </div>
    </>
  );
}
