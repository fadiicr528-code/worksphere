import React from 'react';
import { X } from 'lucide-react';
export default function Modal({ open,onClose,title,subtitle,children,footer }) {
  if(!open) return null;
  return <div className="modal-backdrop" onMouseDown={e=>e.target===e.currentTarget&&onClose()}><div className="modal-card"><div className="modal-head"><div><h2>{title}</h2>{subtitle&&<p>{subtitle}</p>}</div><button className="icon-button" onClick={onClose}><X size={19}/></button></div><div className="modal-body">{children}</div>{footer&&<div className="modal-footer">{footer}</div>}</div></div>;
}
