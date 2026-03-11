class Message(TypedDict):
    role: Literal["user", "assistant"]
    content: str


# Order Database (for tool calls)
ORDER_DATABASE: Dict[str, Dict[str, str]] = {
    "ORD-12345": {
        "status": "shipped",
        "carrier": "FedEx",
        "trackingNumber": "1234567890",
        "eta": "December 11, 2025",
    },
    "ORD-67890": {
        "status": "processing",
        "carrier": "pending",
        "trackingNumber": "pending",
        "eta": "December 15, 2025",
    },
    "ORD-11111": {
        "status": "delivered",
        "carrier": "UPS",
        "trackingNumber": "9876543210",
        "eta": "Delivered December 5, 2025",
    },
}


# FAQ Database (for RAG)
class FAQEntry(TypedDict):
    id: int
    question: str
    answer: str
    category: str
    embedding: Optional[List[float]]


FAQ_DATABASE: List[FAQEntry] = [
    {
        "id": 1,
        "question": "How do I reset my password?",
        "answer": "Go to Settings > Security > Reset Password. You'll receive an email with a reset link that expires in 24 hours.",
        "category": "Account",
        "embedding": None,
    },
    {
        "id": 2,
        "question": "What's your refund policy?",
        "answer": "We offer full refunds within 30 days of purchase for unused items. Contact support with your order number to initiate a refund.",
        "category": "Billing",
        "embedding": None,
    },
    {
        "id": 3,
        "question": "How do I cancel my subscription?",
        "answer": "Go to Account Settings > Subscription > Cancel Subscription. Your access continues until the end of the current billing period.",
        "category": "Billing",
        "embedding": None,
    },
    {
        "id": 4,
        "question": "What payment methods do you accept?",
        "answer": "We accept Visa, Mastercard, American Express, PayPal, and Apple Pay. All transactions are securely processed.",
        "category": "Billing",
        "embedding": None,
    },
    {
        "id": 5,
        "question": "How do I update my profile information?",
        "answer": "Go to Account Settings > Profile. You can update your name, email, phone number, and address there.",
        "category": "Account",
        "embedding": None,
    },
]

QueryCategory = Literal["order_status", "faq"]


class ClassificationResult(TypedDict):
    category: QueryCategory
    confidence: str
    reasoning: str


class AgentResponse(TypedDict):
    query: str
    response: str
    spanId: str
    category: QueryCategory
    sessionId: Optional[str]


class SessionContext(TypedDict):
    lastMentionedOrderId: Optional[str]
    turnCount: int
