// import JSZip from "jszip";
import JSZip from 'jszip';
import fs from "fs";
import path from "path";
import { spawn } from "child_process";
import requestIp from 'request-ip';
import express from 'express';

const app = express();
app.use(requestIp.mw());


// 

export const downloadHostConfig = async (req, res) => {
    const { random_Code, filename } = req.body;

    if (!filename) {
        return res.status(400).json({
            success: false,
            msg: 'Filename not found'
        });
    }

    // Your logic to generate the .exe content based on random_Code and other data
    const exeContent = `
        // Generate .exe content here based on the provided data
        Random Code: ${random_Code}
        // Other necessary details...
    `;

    // Assuming there's a script to generate the .exe file with configuration details
    // Modify this path according to your system
    const exeFilePath = `C:/Users/admin/Desktop/exe_script`; 

    // Output file path for the generated .exe file
    const outputExeFilePath = `C:/Users/admin/Desktop/${filename}_${random_Code}.exe`;

    // Spawn the process to generate the .exe file
    const child = spawn(exeFilePath, [], { shell: true });

    child.on('error', (err) => {
        console.error('Error occurred while generating the exe file:', err);
        res.status(500).json({
            success: false,
            msg: 'Error occurred while generating the exe file'
        });
    });

    child.on('exit', async (code) => {
        if (code === 0) {
            // File generation successful
            // Read the generated executable file
            try {
                const exeFileData = fs.readFileSync(outputExeFilePath);
                fs.writeFileSync(exeContent);
                // Set headers for the response
                res.setHeader('Content-Type', 'application/octet-stream');
                res.setHeader('Content-Disposition', `attachment; filename=${filename}_${random_Code}.exe`);
                
                // Send the response with the executable file content
                res.send(exeFileData);
            } catch (error) {
                console.error('Error reading the generated exe file:', error);
                res.status(500).json({
                    success: false,
                    msg: 'Error reading the generated exe file'
                });
            }
        } else {
            console.error('Failed to generate the exe file');
            res.status(500).json({
                success: false,
                msg: 'Failed to generate the exe file'
            });
        }
    });
};


// export const downloadHostConfig = async (req, res) => {
// 	const { filename } = req.body;

// 	if(filename == null || filename == '') {
// 		return res.status(400).json({
// 			success: false,
// 			msg: 'filename not found'
// 		})
// 	}

// 	const zip = new JSZip(); // uncomment this

// 	try {
// 		const image = zip.folder("image");
// 		const control = zip.folder("control");
// 		const command = zip.folder("command");
// 		const exes = zip.folder("exes");

// 		image.file(`${filename}.txt`, fs.readFileSync(`/root/sessions/image/${filename}.txt`), { base64: true });
// 		// control.file(`${filename}.txt`, fs.readFileSync(`/root/sessions/control/${filename}.txt`), { base64: true });
// 		// command.file(`${filename}.txt`, fs.readFileSync(`/root/sessions/command/${filename}.txt`), { base64: true });
// 		exes.file("Server.Win.exe", fs.readFileSync("/root/prod30nov/exe_v1.2/Server.Win.exe"), { base64: true });

// 		await zip.generateAsync({ type: "nodebuffer" }).then((zipData) => {
// 			res.setHeader("Content-Type", "application/zip");
// 			res.setHeader("Content-Disposition", `attachment; filename=${filename}.zip`);
// 			res.send(zipData);
// 		});
// 	} catch (err) {
// 		res.send(err);
// 		console.log(err);
// 	}
// };
// Generate the ZIP file as a buffer
	//    zip.generateAsync({ type: 'nodebuffer' }).then((content) => {
	//        res.setHeader('Content-Type', 'application/zip');
	//        res.setHeader('Content-Disposition', 'attachment; filename=Host.zip');
	//        res.send(content);
	//    });

	// fs.promises.readFile(filePath)
	//  .then(fileData => {
	//    // Add the file to the JSZip instance
	//    zip.file('Server.Win.exe', fileData, { compression: 'DEFLATE', compressionOptions: { level: 9 } });
	
	//    // Generate the ZIP file
	//    return zip.generateAsync({ type: 'nodebuffer' });
	//  })
	//  .then(zipData => {
	//    // Save the ZIP file
	//    // fs.promises.writeFile('output.zip', zipData);
	//        res.setHeader('Content-Type', 'application/zip');
	//        res.setHeader('Content-Disposition', 'attachment; filename=Host.zip');
	//        res.send(zipData);
	//  })
	//  .catch(error => {
	//    console.error('Error:', error);
	//  });
	

    export const downloadClientConfig = async (req, res) => {
        const { filename } = req.body;
    
        if (!filename) {
            return res.status(400).json({
                success: false,
                msg: 'Filename not found'
            });
        }
    
        const zip = new JSZip();
    
        try {
            const image = zip.folder("image");
            const exes = zip.folder("exes");
    
            // Assuming the text file exists
            image.file(`${filename}.txt`, fs.readFileSync(`/root/sessions/image/${filename}.txt`), { base64: true });
    
            // Adding executable files to the zip
            exes.file("Client.Win.exe", fs.readFileSync("/root/prod30nov/exe_v1.2/client/Client.Win.exe"), { base64: true });
            exes.file("Client.Win.pdb", fs.readFileSync("/root/prod30nov/exe_v1.2/client/Client.Win.pdb"), { base64: true });
            exes.file("NAudio.Asio.dll", fs.readFileSync("/root/prod30nov/exe_v1.2/client/NAudio.Asio.dll"), { base64: true });
    
            const zipData = await zip.generateAsync({ type: "nodebuffer" });
            res.setHeader("Content-Type", "application/zip");
            res.setHeader("Content-Disposition", `attachment; filename=${filename}.zip`);
            res.send(zipData);
        } catch (err) {
            res.status(500).send(err);
            console.error(err);
        }
    };

export const downloadHost = async (req, res) => {
    // const exeFilePath = '/root/prod30nov/exes/Server.Win.exe';  // Replace with the actual path to your .exe file
	const exeFilePath = 'C:/Users/admin/Desktop/Server.Win.exe';
    // Set appropriate headers for the response
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename=Server.Win.exe');

    // Send the file
    res.status(200).sendFile(exeFilePath);
}

export const downloadClient = async (req, res) => {
    // const exeFilePath = '/root/prod30nov/exes/Client.Win.exe';  // Replace with the actual path to your .exe file
	const exeFilePath = 'C:/Users/admin/Desktop/Server.Win.exe';
    // Set appropriate headers for the response
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename=Client.Win.exe');

    // Send the file
    res.status(200).sendFile(exeFilePath);
}
