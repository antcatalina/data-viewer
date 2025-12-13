# Data Visualization App

A lightweight, client-side data visualization tool that allows users to upload CSV or Excel files and instantly generate interactive charts and graphs. Built with modern web technologies for fast performance and seamless user experience.

## ✨ Features

- 📊 **Interactive Charts** - Generate beautiful, interactive visualizations from your data
- 📁 **Multiple File Formats** - Support for CSV and Excel (.xlsx, .xls) files
- 🔄 **Dataset Switching** - Upload and switch between multiple datasets seamlessly
- 🎯 **Data Filtering** - Apply basic filters to focus on specific data points
- 💾 **Export Options** - Export visualizations as images (PNG/JPEG) or PDFs
- 📤 **Data Export** - Re-export filtered data as CSV or Excel files
- ⚡ **Client-Side Processing** - Fast, secure processing without server uploads
- 🎨 **Drag & Drop** - Easy file uploads with drag-and-drop interface

## 🚀 Tech Stack

### Frontend
- **React 19** with TypeScript for type-safe development
- **Vite** for lightning-fast builds and development
- **Bootstrap 5** + React Bootstrap for responsive UI
- **Recharts/ECharts** for interactive data visualizations
- **Zustand** for lightweight state management

### Data Processing
- **PapaParse** for robust CSV parsing
- **xlsx** for Excel file handling
- **react-dropzone** for drag-and-drop file uploads

### Export & Output
- **jsPDF** for PDF generation
- **html-to-image** for chart image exports
- Native browser APIs for data re-export

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/data-viz-app.git
cd data-viz-app
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open your browser to `http://localhost:5173`

## 🛠️ Development

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm lint         # Run linter
```

### Project Structure

```
src/
├── components/
│   ├── FileUploader.tsx      # Drag-drop file upload
│   ├── DatasetSelector.tsx   # Switch between datasets
│   ├── ChartViewer.tsx       # Display charts
│   ├── FilterPanel.tsx       # Apply data filters
│   └── ExportControls.tsx    # Export functionality
├── hooks/
│   └── useDataParser.ts      # Data parsing logic
├── utils/
│   ├── csvParser.ts          # CSV parsing utilities
│   ├── excelParser.ts        # Excel parsing utilities
│   └── exportUtils.ts        # Export functions
├── types/
│   └── index.ts              # TypeScript type definitions
└── stores/
    └── dataStore.ts          # Zustand state management
```

## 🎯 Usage

1. **Upload Data**: Drag and drop a CSV or Excel file onto the upload zone
2. **View Charts**: Automatically generated charts appear based on your data
3. **Apply Filters**: Use the filter panel to focus on specific data ranges or categories
4. **Switch Datasets**: Upload multiple files and switch between them
5. **Export**: Download your visualizations as images/PDFs or export filtered data

## 🔧 Configuration

The app works out of the box with sensible defaults. For customization:

- Chart types and styles can be configured in `ChartViewer.tsx`
- Data parsing options are in `utils/csvParser.ts` and `utils/excelParser.ts`
- Export settings can be modified in `utils/exportUtils.ts`

## 🚀 Deployment

### Build for Production

```bash
pnpm build
```

The optimized build will be in the `dist/` directory.

### Deploy Options

- **Vercel**: `vercel deploy`
- **Netlify**: Connect your GitHub repo or drag the `dist/` folder
- **GitHub Pages**: Use `gh-pages` package
- **Cloudflare Pages**: Connect your repository

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- [Recharts](https://recharts.org/) for beautiful React charts
- [PapaParse](https://www.papaparse.com/) for reliable CSV parsing
- [SheetJS](https://sheetjs.com/) for Excel file handling
- [React Bootstrap](https://react-bootstrap.github.io/) for UI components

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

Built with ❤️ using React, TypeScript, and Vite