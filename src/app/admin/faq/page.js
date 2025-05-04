"use client";

import { useState, useEffect } from "react";
import { DisplayCard } from "@/components/cards/faq/display";
import Link from "next/link";
import classes from './page.module.css';
import { usePathname } from "next/navigation";

export default function FaqPage() {
    const [faqs, setFaqs] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [expandedId, setExpandedId] = useState(null);

    const path = usePathname();

    useEffect(() => {
        async function fetchFaqs() {
            const res = await fetch('/api/faq/get-faq'); 
            const data = await res.json();
            setFaqs(data);
        }
        fetchFaqs();
    }, []);

    const filteredFaqs = faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleExpand = (id) => {
        setExpandedId(prev => (prev === id ? null : id));
    };

    const handleDelete = (id) => {
        setFaqs(prev => prev.filter(f => f.id !== id));
      };

    return (
        <div className={classes.container}>
            <Link href="/admin/faq/create" className={classes.addFaq}>
                Add FAQ
            </Link>
            <div className={classes.topBar}>
                <input 
                    type="text" 
                    placeholder="Search FAQ" 
                    name="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={classes.searchInput}
                />
                <Link href="/admin/faq/ai" className={classes.askAiButton}>
                    Ask AI
                </Link>
            </div>

            {filteredFaqs.length === 0 ? (
                <p>No FAQs match your search.</p>
            ) : (
                filteredFaqs.map((faq) => (
                    <DisplayCard 
                        id = {faq.id}
                        key={faq.id} 
                        question={faq.question} 
                        answer={faq.answer}
                        isExpanded={expandedId === faq.id}
                        onToggle={() => handleExpand(faq.id)}
                        path={path}
                        onDelete={handleDelete} 
                    />
                ))
            )}
        </div>
    );
}