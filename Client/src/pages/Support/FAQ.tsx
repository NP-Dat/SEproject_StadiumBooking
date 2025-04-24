import React from 'react';
import styles from './Support.module.css';

const FAQ = () => {
    const faqs = [
        {
            question: "How do I book tickets?",
            answer: "To book tickets, simply browse our events, select your preferred seats, and proceed to checkout. You'll need to create an account or sign in to complete your booking. We accept all major credit cards and PayPal for secure payments."
        },
        {
            question: "Can I cancel or modify my booking?",
            answer: "Yes, you can modify or cancel your booking up to 24 hours before the event. Please refer to our Refund Policy for more details. To make changes, log in to your account and visit the 'My Bookings' section."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and various local payment methods. All transactions are secure and encrypted for your safety."
        },
        {
            question: "How do I access my tickets?",
            answer: "After successful booking, you'll receive an email with your tickets. You can also access them through your account dashboard. We recommend downloading the tickets to your mobile device or printing them before the event."
        },
        {
            question: "What if an event is cancelled?",
            answer: "In case of event cancellation, you'll be notified immediately via email and receive a full refund. The refund will be processed to your original payment method within 5-10 business days."
        },
        {
            question: "Is there a mobile app available?",
            answer: "Yes, we have a mobile app available for both iOS and Android devices. You can download it from the App Store or Google Play Store to manage your bookings on the go."
        },
        {
            question: "How can I contact customer support?",
            answer: "Our customer support team is available 24/7. You can reach us via email at support@weblifyco.com, phone at +1 (555) 123-4567, or through our live chat feature on the website."
        }
    ];

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Frequently Asked Questions</h1>
            <div>
                {faqs.map((faq, index) => (
                    <div key={index} className={styles.section}>
                        <h2 className={styles.sectionTitle}>{faq.question}</h2>
                        <p className={styles.content}>{faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ; 