import { useState } from 'react'
import './App.css'

function App() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        installation: '',
        usage: '',
        features: '',
        techStack: '',
        contributing: '',
        license: 'MIT',
        author: '',
        badges: true
    })

    const [generatedReadme, setGeneratedReadme] = useState('')

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const generateReadme = () => {
        let readme = ''

        // Badges
        if (formData.badges && formData.license) {
            readme += `![License](https://img.shields.io/badge/license-${formData.license}-blue.svg)\n\n`
        }

        // Title
        if (formData.title) {
            readme += `# ${formData.title}\n\n`
        }

        // Description
        if (formData.description) {
            readme += `## 📖 Description\n\n${formData.description}\n\n`
        }

        // Tech Stack
        if (formData.techStack) {
            readme += `## 🛠️ Tech Stack\n\n${formData.techStack}\n\n`
        }

        // Features
        if (formData.features) {
            readme += `## ✨ Features\n\n${formData.features}\n\n`
        }

        // Installation
        if (formData.installation) {
            readme += `## 📦 Installation\n\n\`\`\`bash\n${formData.installation}\n\`\`\`\n\n`
        }

        // Usage
        if (formData.usage) {
            readme += `## 🚀 Usage\n\n\`\`\`bash\n${formData.usage}\n\`\`\`\n\n`
        }

        // Contributing
        if (formData.contributing) {
            readme += `## 🤝 Contributing\n\n${formData.contributing}\n\n`
        }

        // License
        if (formData.license) {
            readme += `## 📄 License\n\nThis project is licensed under the ${formData.license} License.\n\n`
        }

        // Author
        if (formData.author) {
            readme += `## 👤 Author\n\n${formData.author}\n`
        }

        setGeneratedReadme(readme)
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedReadme)
        alert('README copied to clipboard!')
    }

    const downloadReadme = () => {
        const blob = new Blob([generatedReadme], { type: 'text/markdown' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'README.md'
        a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <div className="app">
            <div className="hero">
                <h1 className="hero-title">
                    <span className="gradient-text">GitHub README</span> Generator
                </h1>
                <p className="hero-subtitle">Create professional README files in seconds ⚡</p>
            </div>

            <div className="container">
                <div className="form-section">
                    <h2 className="section-title">Project Details</h2>

                    <div className="form-group">
                        <label htmlFor="title">Project Title *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="My Awesome Project"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description *</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="A brief description of your project..."
                            rows="4"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="techStack">Tech Stack</label>
                        <textarea
                            id="techStack"
                            name="techStack"
                            value={formData.techStack}
                            onChange={handleChange}
                            placeholder="- React\n- Node.js\n- MongoDB"
                            rows="3"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="features">Features</label>
                        <textarea
                            id="features"
                            name="features"
                            value={formData.features}
                            onChange={handleChange}
                            placeholder="- Feature 1\n- Feature 2\n- Feature 3"
                            rows="3"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="installation">Installation</label>
                        <textarea
                            id="installation"
                            name="installation"
                            value={formData.installation}
                            onChange={handleChange}
                            placeholder="npm install\nnpm start"
                            rows="3"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="usage">Usage</label>
                        <textarea
                            id="usage"
                            name="usage"
                            value={formData.usage}
                            onChange={handleChange}
                            placeholder="npm run dev"
                            rows="2"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="contributing">Contributing</label>
                        <textarea
                            id="contributing"
                            name="contributing"
                            value={formData.contributing}
                            onChange={handleChange}
                            placeholder="Contributions are welcome! Please open an issue or submit a pull request."
                            rows="2"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="license">License</label>
                            <select
                                id="license"
                                name="license"
                                value={formData.license}
                                onChange={handleChange}
                            >
                                <option value="MIT">MIT</option>
                                <option value="Apache-2.0">Apache 2.0</option>
                                <option value="GPL-3.0">GPL 3.0</option>
                                <option value="BSD-3-Clause">BSD 3-Clause</option>
                                <option value="ISC">ISC</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="author">Author</label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                placeholder="Your Name"
                            />
                        </div>
                    </div>

                    <div className="form-group checkbox-group">
                        <label>
                            <input
                                type="checkbox"
                                name="badges"
                                checked={formData.badges}
                                onChange={handleChange}
                            />
                            <span>Include badges</span>
                        </label>
                    </div>

                    <button className="btn-generate" onClick={generateReadme}>
                        Generate README ✨
                    </button>
                </div>

                <div className="preview-section">
                    <div className="preview-header">
                        <h2 className="section-title">Preview</h2>
                        {generatedReadme && (
                            <div className="preview-actions">
                                <button className="btn-action" onClick={copyToClipboard}>
                                    📋 Copy
                                </button>
                                <button className="btn-action" onClick={downloadReadme}>
                                    💾 Download
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="preview-content">
                        {generatedReadme ? (
                            <pre>{generatedReadme}</pre>
                        ) : (
                            <div className="preview-placeholder">
                                <p>Your README will appear here...</p>
                                <p className="preview-hint">Fill in the form and click "Generate README"</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
