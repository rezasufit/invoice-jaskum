// InvoiceGenerator.jsx
import React, { useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import invoice from "../../api/invoice";
import "./InvoiceGenerator.css";
import jaskumLogo from "../../images/jaskum-logo.png";
import { v4 as uuidv4 } from "uuid";

export default function InvoiceGenerator() {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [selectedVakumId, setSelectedVakumId] = useState("");
  const [selectedWashingId, setSelectedWashingId] = useState("");
  const [selectedTambahanId, setSelectedTambahanId] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState([]);
  const [catatan, setCatatan] = useState("");
  const [invoiceData, setInvoiceData] = useState(null);
  const [diskonTipe, setDiskonTipe] = useState("persen"); // 'persen' atau 'nominal'
  const [diskonValue, setDiskonValue] = useState(""); // bisa angka persen atau harga final nominal
  const invoiceRef = useRef(null);

  function formatNominalWithDot(numberString) {
    if (!numberString) return "";
    const num = numberString.toString();
    const sisa = num.length % 3;
    let result = num.substr(0, sisa);
    const ribuan = num.substr(sisa).match(/\d{3}/g);
    if (ribuan) {
      const separator = sisa ? "." : "";
      result += separator + ribuan.join(".");
    }
    return result;
  }

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

  function handleAddProductById(productId) {
    if (!productId) return;
    // Ganti pencarian produk: pakai id (number), bukan uuid (string)
    const product = invoice.find((p) => p.id === parseInt(productId));
    if (!product) return;

    setSelectedInvoice([
      ...selectedInvoice,
      { ...product, qty: 1, qtyInput: "1", note: "", uuid: uuidv4() },
    ]);
  }

  function handleQtyChange(uuid, inputValue) {
    setSelectedInvoice((prev) =>
      prev.map((p) => {
        if (p.uuid !== uuid) return p;

        // Hanya ambil angka dan titik (desimal)
        const cleaned = inputValue.replace(/[^0-9.]/g, "");

        // Cek kalau angka valid
        const qtyNum = parseFloat(cleaned);

        // Kalau invalid, jangan update qty, hanya simpan inputnya
        if (isNaN(qtyNum) || qtyNum <= 0) {
          return { ...p, qtyInput: inputValue };
        }

        // Valid qty > 0
        return { ...p, qtyInput: inputValue, qty: qtyNum };
      })
    );
  }

  function handleNoteChange(uuid, note) {
    setSelectedInvoice((prev) =>
      prev.map((p) => (p.uuid === uuid ? { ...p, note } : p))
    );
  }

  function handleRemoveProduct(uuid) {
    setSelectedInvoice((prev) => prev.filter((p) => p.uuid !== uuid));
  }

  const totalHarga = selectedInvoice.reduce(
    (total, p) => total + p.price * p.qty,
    0
  );

  const hargaFinal = (() => {
    const total = totalHarga;
    const tipe = diskonTipe;
    const val = parseFloat(diskonValue.replace(/\D/g, "")) || 0;

    if (tipe === "persen" && val > 0 && val <= 100) {
      // diskon persen valid 0-100
      return Math.round(total * (1 - val / 100));
    } else if (tipe === "nominal" && val > 0 && val < total) {
      // diskon nominal valid dan harus kurang dari total
      return val;
    }
    return total; // default tidak ada diskon
  })();

  const potonganHarga = totalHarga > hargaFinal ? totalHarga - hargaFinal : 0;

  function generateInvoice() {
    if (!nama.trim() || !alamat.trim() || selectedInvoice.length === 0) {
      alert("Mohon isi nama, alamat, dan pilih minimal 1 produk");
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
      alamat: alamat.trim(),
      produk: selectedInvoice,
      totalHarga,
      hargaFinal,
      potonganHarga,
      catatan: catatan.trim() || "-",
      tanggalFormatted,
    });
  }

  function downloadPDF() {
    if (!invoiceRef.current || !invoiceData) return;

    const tanggal = new Date();
    const tanggalFilename = tanggal.toISOString().split("T")[0];
    const safeNama = invoiceData.nama.replace(/\s+/g, "_");
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

  const handleQuantityChange = (uuid, delta) => {
    setSelectedInvoice((prev) =>
      prev.map((p) =>
        p.uuid === uuid
          ? {
              ...p,
              qty: Math.max(1, p.qty + delta),
              qtyInput: Math.max(1, p.qty + delta).toString(),
            }
          : p
      )
    );
  };

  return (
    <>
      {/* Container Input Form */}
      <div className="inv-form-container">
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

          {/* Tambahan input alamat */}
          <label className="inv-label">Alamat</label>
          <textarea
            className="inv-textarea"
            placeholder="Masukkan alamat pelanggan"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
            rows={2}
            required
          />

          {/* VAKUM */}
          <label className="inv-label">Pilih Produk - Vakum</label>
          <select
            className="inv-select"
            value={selectedVakumId}
            onChange={(e) => setSelectedVakumId(e.target.value)}
          >
            <option value="">-- Vacum --</option>
            {invoice
              .filter((p) => p.category === "Vakum")
              .map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({formatRupiah(p.price)})
                </option>
              ))}
          </select>
          <button
            type="button"
            onClick={() => {
              handleAddProductById(selectedVakumId);
              setSelectedVakumId("");
            }}
            disabled={!selectedVakumId}
            className="inv-btn-add"
          >
            Tambah Produk Vakum
          </button>

          {/* Washing */}
          <label className="inv-label">Pilih Produk - Washing</label>
          <select
            className="inv-select"
            value={selectedWashingId}
            onChange={(e) => setSelectedWashingId(e.target.value)}
          >
            <option value="">-- Washing --</option>
            {invoice
              .filter((p) => p.category === "Washing")
              .map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({formatRupiah(p.price)})
                </option>
              ))}
          </select>
          <button
            type="button"
            onClick={() => {
              handleAddProductById(selectedWashingId);
              setSelectedWashingId("");
            }}
            disabled={!selectedWashingId}
            className="inv-btn-add"
          >
            Tambah Produk Washing
          </button>

          {/* TAMBAHAN */}
          <label className="inv-label">Pilih Produk - Jasa Tambahan</label>
          <select
            className="inv-select"
            value={selectedTambahanId}
            onChange={(e) => setSelectedTambahanId(e.target.value)}
          >
            <option value="">-- Tambahan --</option>
            {invoice
              .filter((p) => p.category === "Jasa Tambahan")
              .map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({formatRupiah(p.price)})
                </option>
              ))}
          </select>
          <button
            type="button"
            onClick={() => {
              handleAddProductById(selectedTambahanId);
              setSelectedTambahanId("");
            }}
            disabled={!selectedTambahanId}
            className="inv-btn-add"
          >
            Tambah Produk Tambahan
          </button>

          {selectedInvoice.length > 0 && (
            <table className="inv-table responsive-table">
              <thead>
                <tr>
                  <th>Jasa</th>
                  <th>Harga Satuan</th>
                  <th>Keterangan</th>
                  <th>Jumlah</th>
                  <th>Subtotal</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {selectedInvoice.map((p) => (
                  <tr key={p.uuid}>
                    <td>{p.name}</td>
                    <td>
                      <input
                        type="text"
                        className="inv-input inv-input-price"
                        value={formatRupiah(p.price)}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/[^0-9]/g, "");
                          setSelectedInvoice(
                            selectedInvoice.map((item) =>
                              item.uuid === p.uuid
                                ? { ...item, price: parseInt(raw || "0") }
                                : item
                            )
                          );
                        }}
                      />
                    </td>

                    <td>
                      <input
                        type="text"
                        className="inv-input inv-input-price"
                        placeholder="Keterangan P x L"
                        value={p.note}
                        onChange={(e) =>
                          handleNoteChange(p.uuid, e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <div className="inv-qty-control">
                        <button
                          type="button"
                          className="inv-qty-btn"
                          onClick={() => handleQuantityChange(p.uuid, -1)}
                        >
                          −
                        </button>
                        <input
                          type="text"
                          className="inv-input-qty"
                          value={p.qtyInput ?? p.qty}
                          onChange={(e) =>
                            handleQtyChange(p.uuid, e.target.value)
                          }
                        />
                        <button
                          type="button"
                          className="inv-qty-btn"
                          onClick={() => handleQuantityChange(p.uuid, 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td className="inv-text-right">
                      {formatRupiah(p.price * p.qty)}
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleRemoveProduct(p.uuid)}
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

          <label className="inv-label">Tipe Diskon</label>
          <select
            className="inv-select"
            value={diskonTipe}
            onChange={(e) => {
              setDiskonTipe(e.target.value);
              setDiskonValue(""); // reset value saat ganti tipe
            }}
          >
            <option value="persen">Diskon Persen (%)</option>
            <option value="nominal">Harga Final (Rp)</option>
          </select>

          <label className="inv-label">
            {diskonTipe === "persen"
              ? "Masukkan Diskon (%)"
              : "Masukkan Harga Final (Rp)"}
          </label>
          <input
            type="text"
            className="inv-input"
            placeholder={
              diskonTipe === "persen" ? "Contoh: 10" : "Contoh: 100.000"
            }
            value={
              diskonTipe === "persen"
                ? diskonValue
                : formatNominalWithDot(diskonValue)
            }
            onChange={(e) => {
              let val = e.target.value;
              if (diskonTipe === "persen") {
                // hanya angka max 3 digit dan max 100
                val = val.replace(/\D/g, "").slice(0, 3);
                if (parseInt(val) > 100) val = "100";
                setDiskonValue(val);
              } else {
                // harga final: hapus semua titik, simpan angka bersih
                const numericVal = val.replace(/\./g, "").replace(/\D/g, "");
                setDiskonValue(numericVal);
              }
            }}
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
      </div>

      {/* Container Preview Invoice (PDF Style) */}
      <div
        className={`inv-pdf-container ${invoiceData ? "inv-show" : ""}`}
        ref={invoiceRef}
      >
        {invoiceData && (
          <>
            <div className="inv-header inv-space-between">
              <img className="inv-logo" src={jaskumLogo} alt="Logo Jaskum" />
              <div className="inv-header-details">
                {invoiceData.tanggalFormatted}
                <div className="inv-header-item">
                  <strong>Kepada:</strong> {invoiceData.nama}
                </div>
                <div className="inv-header-item">
                  <strong>Alamat:</strong> {invoiceData.alamat}
                </div>
              </div>
            </div>

            <table className="inv-table">
              <thead>
                <tr>
                  <th>Jasa</th>
                  <th>Harga Satuan</th>
                  <th>Keterangan</th>
                  <th>Jumlah</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.produk.map((p) => (
                  <tr key={p.uuid}>
                    <td>{p.name}</td>
                    <td className="inv-text-right">{formatRupiah(p.price)}</td>
                    <td className="inv-text-center">{p.note || "-"}</td>
                    <td className="inv-text-center">{p.qty}</td>
                    <td className="inv-text-right">
                      {formatRupiah(p.price * p.qty)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4" className="inv-text-right inv-bold">
                    Total
                  </td>
                  <td className="inv-text-right inv-bold">
                    {formatRupiah(invoiceData.totalHarga)}
                  </td>
                </tr>

                {invoiceData.potonganHarga > 0 && (
                  <tr>
                    <td colSpan="4" className="inv-text-right inv-bold">
                      Potongan Harga
                    </td>
                    <td
                      className="inv-text-right inv-bold"
                      style={{ color: "red" }}
                    >
                      -{formatRupiah(invoiceData.potonganHarga)}
                    </td>
                  </tr>
                )}

                <tr>
                  <td colSpan="4" className="inv-text-right inv-bold">
                    Harga Akhir
                  </td>
                  <td className="inv-text-right inv-bold">
                    {formatRupiah(invoiceData.hargaFinal)}
                  </td>
                </tr>
              </tfoot>
            </table>

            <p className="inv-note">Catatan: {invoiceData.catatan}</p>

            <div className="inv-bank-info">
              <h3>BCA</h3>
              <p>
                No. Rekening: 5310386164
                <br />
                Atas Nama: Putri Boy Lutfi
              </p>
            </div>

            <p className="inv-thanks">Terima kasih atas kepercayaan Anda!</p>
          </>
        )}
      </div>
    </>
  );
}
