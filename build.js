const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

const distDir = 'dist';

async function build() {
    try {
        // Create dist directory if it doesn't exist
        if (!fs.existsSync(distDir)) {
            fs.mkdirSync(distDir);
        }

        // 1. Build the TSX/JS code
        await esbuild.build({
            entryPoints: ['index.tsx'],
            bundle: true,
            outfile: path.join(distDir, 'bundle.js'),
            jsx: 'automatic',
            loader: { '.tsx': 'tsx' },
            define: {
                'process.env.NODE_ENV': '"production"',
            },
            minify: true,
            sourcemap: false,
        });

        // 2. Process and copy index.html
        let html = fs.readFileSync('index.html', 'utf-8');

        // Remove importmap script block
        html = html.replace(/<script type="importmap">[\s\S]*?<\/script>/s, '');
        
        // Remove the old module script tag for index.tsx
        html = html.replace(/<script type="module" src="\/index.tsx"><\/script>/, '');

        // Add the new bundled script tag before </body>
        html = html.replace('</body>', `    <script src="/bundle.js"></script>\n  </body>`);
        
        fs.writeFileSync(path.join(distDir, 'index.html'), html);
        
        console.log('Build finished successfully!');
    } catch (error) {
        console.error('Build failed:', error);
        process.exit(1);
    }
}

build();
