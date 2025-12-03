import React from "react";
import { useTranslation } from "react-i18next";
import './LanguageSelector.css';

export default function LanguageSelector({ className = ''} ) {
    const { i18n } = useTranslation();
    const current = (i18n.language || 'en').split('-')[0];

    return (
        <div className={`language-selector ${className}`}>
            <label htmlFor="lang-select" className="sr-only">Select Language</label>
            <select
            id="lang-select"
            value={current}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            >
                <option value="en">EN</option>
                <option value="fi">FI</option>
            </select>
        </div>
    )
}