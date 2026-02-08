// FIX: Created the missing PaymentIcons component.
import React from 'react';

// Using a simplified component that returns a fragment of SVGs
// to avoid creating many small components for each icon.
export const PaymentIcons: React.FC = () => (
  <>
    {/* Bancolombia (Simplified representation) */}
    <div className="flex items-center justify-center h-12 w-20 bg-white rounded-lg p-1">
      <svg viewBox="0 0 100 60" className="h-full w-full">
        <rect width="100" height="60" fill="#FFD700" />
        <rect x="33" width="34" height="60" fill="#0000FF" />
        <rect x="67" width="33" height="60" fill="#FF0000" />
      </svg>
    </div>

    {/* Nequi (Simplified representation) */}
    <div className="flex items-center justify-center h-12 w-20 bg-[#210049] rounded-lg p-2 text-white font-bold text-lg">
      <span>Nequi</span>
    </div>

    {/* Daviplata (Simplified representation) */}
    <div className="flex items-center justify-center h-12 w-20 bg-red-600 rounded-lg p-2 text-white font-bold text-lg">
      <span style={{ fontFamily: 'monospace' }}>Davi<br/>Plata</span>
    </div>
    
    {/* PayPal Icon */}
    <div className="flex items-center justify-center h-12 w-20 bg-[#003087] rounded-lg p-2">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
        <path d="M3.32463 20.3235L5.78913 5.01176H9.42913C12.3516 5.01176 14.5446 6.84118 13.9116 9.87647C13.4346 12.1235 11.6051 13.1118 9.53163 13.1118H7.33863L6.86163 16.0353H5.98663L6.22513 14.6735H8.29863C9.53163 14.6735 10.4076 14.0412 10.6461 12.9235C11.1231 10.6765 9.42913 9.44118 7.33863 9.44118H5.98663L3.32463 20.3235H0.663135L4.05363 0H10.1586C14.0641 0 17.0916 2.33824 16.3561 6.54118C15.7231 10.2324 12.9726 12.2941 9.86463 12.5824L9.12913 16.8882L8.74863 19.3529C8.64613 20.0882 9.02713 20.4706 9.76263 20.4706H11.2116L12.0871 14.8206H14.1606L13.2846 20.3235H10.6231L11.5 14.6735L11.7386 13.2618L12.3716 9.15588C12.5016 8.35588 13.2371 7.87647 14.0641 8.02353C16.2571 8.40588 17.6191 7.28824 18.0961 4.88235L19.8906 4.73529C19.5096 7.42941 17.4361 9.36765 14.7816 9.36765C13.8031 9.36765 12.8246 8.98529 12.3476 8.09706L11.2116 15.1059L12.2846 20.4706H15.0351L17.2281 6.84118H20.8681L18.6751 20.3235H15.9246L17.0016 13.5824L17.4786 10.7324L16.2571 11.0206C14.7816 11.3088 13.8031 12.4265 14.2801 14.0412L13.0586 22H24L20.6096 2.02941H16.0261L18.4911 17.3412L15.9246 17.1941L15.3901 13.8706L15.8226 11.2118C16.0611 9.73529 17.4231 8.74706 18.8721 8.48235L20.6666 8.19412L21.3 4.29412C20.6666 4.44118 19.8906 4.73529 19.8906 4.73529L18.0961 4.88235C18.4771 2.33824 16.5421 0.723529 14.1606 0.723529H9.42913L7.06513 16.4882L6.86163 16.0353L3.32463 20.3235Z" fill="#FFFFFF"/>
      </svg>
    </div>
  </>
);