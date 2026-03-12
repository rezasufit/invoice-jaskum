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
    if (!invoiceRef.current) return;

    const options = {
      margin: 0.3,
      filename: "invoice_jaskum.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(invoiceRef.current).save();
  }

  const categories = [...new Set(invoice.map((p) => p.category))];

  return (
    <>
      <div className="invoice-header">
        <img src={jaskumLogo} className="logo-invoice" alt="Logo Jaskum" />
        <h2>Buat Invoice Online</h2>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        <label>Nama Pelanggan</label>
        <input
          type="text"
          placeholder="Masukkan nama pelanggan"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />

        <label>Pilih Produk/Jasa</label>
        <select
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
          style={{ marginTop: "8px" }}
        >
          Tambah Produk/Jasa
        </button>

        {selectedInvoice.length > 0 && (
          <table className="invoice-table" style={{ marginTop: "16px" }}>
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
                  <td className="text-right">{formatRupiah(p.price)}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={p.qty}
                      onChange={(e) =>
                        handleQtyChange(p.id, parseInt(e.target.value) || 1)
                      }
                      style={{ width: "60px" }}
                    />
                  </td>
                  <td className="text-right">
                    {formatRupiah(p.price * p.qty)}
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleRemoveProduct(p.id)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td
                  colSpan="3"
                  style={{ textAlign: "right", fontWeight: "bold" }}
                >
                  Total
                </td>
                <td className="text-right" style={{ fontWeight: "bold" }}>
                  {formatRupiah(totalHarga)}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        )}

        <label>Catatan (opsional)</label>
        <textarea
          placeholder="Masukkan catatan tambahan"
          value={catatan}
          onChange={(e) => setCatatan(e.target.value)}
          rows={3}
        />

        <div className="btn-group" style={{ marginTop: "16px" }}>
          <button type="button" onClick={generateInvoice}>
            Buat Invoice
          </button>
          {invoiceData && (
            <button
              type="button"
              onClick={downloadPDF}
              style={{ marginLeft: "8px" }}
            >
              Download PDF
            </button>
          )}
        </div>
      </form>

      <div
        className={`invoice-container ${invoiceData ? "show" : ""}`}
        ref={invoiceRef}
        style={{ marginTop: "32px" }}
      >
        {invoiceData && (
          <>
            <div className="invoice-header" style={{ marginBottom: "16px" }}>
              <div>
                <img
                  className="logo-invoice"
                  src={jaskumLogo}
                  alt="Logo Jaskum"
                />
                <strong>Kepada:</strong> {invoiceData.nama}
              </div>
              <div>Tanggal: {invoiceData.tanggalFormatted}</div>
            </div>

            <table className="invoice-table">
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
                    <td className="text-right">{formatRupiah(p.price)}</td>
                    <td className="text-center">{p.qty}</td>
                    <td className="text-right">
                      {formatRupiah(p.price * p.qty)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td
                    colSpan="3"
                    className="text-right"
                    style={{ fontWeight: "bold" }}
                  >
                    Total
                  </td>
                  <td className="text-right" style={{ fontWeight: "bold" }}>
                    {formatRupiah(invoiceData.totalHarga)}
                  </td>
                </tr>
              </tfoot>
            </table>

            <p className="note">Catatan: {invoiceData.catatan}</p>
            <p className="thanks">Terima kasih atas kepercayaan Anda!</p>
          </>
        )}
      </div>
    </>
  );
}
