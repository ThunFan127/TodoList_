import React from "react";

export default function ConfirmModal({ open, title, message, onCancel, onConfirm }) {
    if (!open) return null;
    return (
        <div className="overlay">
            <div className="modal-custom">
                <div className="modal-header-custom">
                    <h5 style={{ fontSize: 18, fontWeight: 600, color: '#333', margin: 0 }}>{title || "Xác nhận"}</h5>
                    <i className="close" onClick={onCancel} style={{ fontSize: 22, color: '#888', cursor: 'pointer' }}>×</i>
                </div>
                <div className="modal-body-custom" style={{ fontSize: 16, color: '#444', marginBottom: 8 }}>
                    <span>{message}</span>
                </div>
                <div className="modal-footer-footer">
                    <button className="btn btn-light" style={{ minWidth: 80, marginRight: 8 }} onClick={onCancel}>HỦY</button>
                    <button className="btn btn-danger" style={{ minWidth: 80 }} onClick={onConfirm}>XÓA</button>
                </div>
            </div>
        </div>
    );
}
