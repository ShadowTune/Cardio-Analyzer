import {
  FaHeartbeat,
  FaStethoscope,
  FaShieldAlt,
  FaQuestionCircle,
  FaCogs,
  FaBullseye,
} from 'react-icons/fa';
import 'animate.css';

export default function Home() {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        fontFamily: "'Poppins', sans-serif",
        backgroundImage: 'linear-gradient(135deg, rgba(59,130,246,0.85), rgba(30,64,175,0.9))',
        color: 'white',
        padding: '2rem',
      }}
    >
      <div className="container">

        {/* HERO */}
        <section className="p-5 mb-5 text-center animate__animated animate__fadeIn">
          <h2 className="fw-bold">Heart Attack Risk Analyzer</h2>
          <p className="lead text-white-50">
            Predict your heart disease risk using AI. Stay safe. Stay informed.
          </p>
        </section>

        {/* MOTIVES */}
        <section className="bg-opacity-25 bg-white rounded-4 p-5 mb-4">
          <h4 className="mb-3"><FaBullseye className="me-2" /> Our Motives</h4>
          <p>
            We aim to empower people with knowledge, tools, and motivation to take control of their cardiovascular health.
          </p>
          <div className="row mt-4 text-center">
            <div className="col-md-4">
              <h6>🧠 Awareness</h6>
              <p className="small">Learn symptoms, causes, and risk factors of heart disease.</p>
            </div>
            <div className="col-md-4">
              <h6>🛡 Prevention</h6>
              <p className="small">Understand how diet, exercise, and habits impact your health.</p>
            </div>
            <div className="col-md-4">
              <h6>🤝 Support</h6>
              <p className="small">We provide insights that help you take better action.</p>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="bg-opacity-25 bg-white rounded-4 p-5 mb-4">
          <h4 className="mb-4"><FaCogs className="me-2" /> Key Features</h4>
          <div className="row text-center">
            {[
              {
                icon: <FaHeartbeat size={30} className="text-danger" />,
                title: 'Accurate',
                desc: 'AI/ML-powered results',
              },
              {
                icon: <FaStethoscope size={30} className="text-info" />,
                title: 'User-Friendly',
                desc: 'Simple and intuitive UI',
              },
              {
                icon: <FaShieldAlt size={30} className="text-success" />,
                title: 'Secure',
                desc: 'Your data is safe',
              },
              {
                icon: <FaQuestionCircle size={30} className="text-warning" />,
                title: 'Informative',
                desc: 'Detailed explanations',
              },
            ].map((f, i) => (
              <div className="col-md-3 mb-3" key={i}>
                <div className="mb-2">{f.icon}</div>
                <h6>{f.title}</h6>
                <p className="small">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section className="bg-opacity-25 bg-white rounded-4 p-5 mb-4">
          <h4 className="mb-4"><FaStethoscope className="me-2" /> What We Offer</h4>
          <div className="row text-center">
            <div className="col-md-4">
              <h6>🧬 Health Prediction</h6>
              <p className="small">AI-based prediction using your medical profile.</p>
            </div>
            <div className="col-md-4">
              <h6>📊 Dashboard</h6>
              <p className="small">Track your risk level and progress over time.</p>
            </div>
            <div className="col-md-4">
              <h6>💡 Health Tips</h6>
              <p className="small">Lifestyle and diet tips to stay healthier.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          className="rounded-4 p-5 mb-5"
          style={{
            backgroundImage: 'linear-gradient(135deg, rgba(59,130,246,0.85), rgba(30,64,175,0.9))',
            color: '#111827',
          }}
        >
          <h4 className="mb-4 fw-bold text-white">
            <FaQuestionCircle className="me-2" /> Frequently Asked Questions
          </h4>
          <div className="accordion" id="faqAccordion">
            {[
              {
                id: 'faq1',
                question: 'Is my data safe?',
                answer: 'Yes. We follow strict encryption and privacy protocols to ensure your data remains protected and confidential.',
              },
              {
                id: 'faq2',
                question: 'How does the prediction work?',
                answer: 'We use trained machine learning models that analyze your input data and calculate a risk score based on medical datasets.',
              },
              {
                id: 'faq3',
                question: 'Is this a substitute for a doctor?',
                answer: 'No. This tool is for risk screening and educational purposes only. Always consult a licensed medical professional for diagnosis.',
              },
              {
                id: 'faq4',
                question: 'Can I use this tool without creating an account?',
                answer: 'Yes! You can use guest mode for quick risk checks. However, registering allows you to save history and access personalized insights.',
              },
              {
                id: 'faq5',
                question: 'How often should I check my heart risk?',
                answer: 'If your lifestyle or health changes, we recommend updating and checking every few weeks. For ongoing care, consult a physician.',
              },
              {
                id: 'faq6',
                question: 'What health data do I need to input?',
                answer: 'You’ll need to enter age, cholesterol levels, blood pressure, exercise habits, and a few other key indicators.',
              },
            ].map(({ id, question, answer }, i) => (
              <div className="accordion-item border-0 mb-3 bg-transparent" key={i}>
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed fw-semibold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${id}`}
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.8)',
                      borderRadius: '0.5rem',
                      marginBottom: '0.5rem',
                      color: '#111827',
                      fontWeight: '600',
                    }}
                  >
                    {question}
                  </button>
                </h2>
                <div
                  id={id}
                  className="accordion-collapse collapse"
                  data-bs-parent="#faqAccordion"
                >
                  <div
                    className="accordion-body"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.8)',
                      borderRadius: '0.5rem',
                      color: '#111827',
                      padding: '1rem',
                    }}
                  >
                    {answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>


        {/* CTA */}
        <section className="text-center">
          <h5 className="fw-semibold mb-3">Ready to take control of your heart health?</h5>
          <a
            href="/register"
            className="btn btn-light text-primary fw-bold px-4 py-2"
          >
            Register Now
          </a>
        </section>

      </div>
    </div>
  );
}
