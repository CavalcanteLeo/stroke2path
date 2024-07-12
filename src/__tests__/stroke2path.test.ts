// import * as fs from 'fs';
// import { execSync } from 'child_process';
// import { processSVG } from '../stroke2path';

// // Mock console.error to suppress output during tests
// const mockConsoleError = jest.fn();
// console.error = mockConsoleError;

// describe('processSVG function', () => {
//   beforeEach(() => {
//     // Clear all mocks before each test
//     jest.restoreAllMocks();
//     mockConsoleError.mockClear();
//   });

//   it('should handle missing input directory', () => {
//     // Simulate missing input directory
//     processSVG('', 'output_dir');
//     expect(mockConsoleError).toHaveBeenCalledWith(
//       expect.stringContaining('No input directory provided.')
//     );
//   });

//   it('should handle missing Inkscape installation', () => {
//     // Mock fs.existsSync to simulate Inkscape not installed
//     jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);

//     processSVG('input_dir', 'output_dir');
//     expect(mockConsoleError).toHaveBeenCalledWith(
//       expect.stringContaining('Inkscape is not installed.')
//     );
//   });

//   it('should process SVG files', () => {
//     // Mock fs.readdirSync to simulate SVG files
//     const svg1 = new fs.Dirent();
//     svg1.isFile = () => true;
//     svg1.name = 'file1.svg';

//     const svg2 = new fs.Dirent();
//     svg2.isFile = () => true;
//     svg2.name = 'file2.svg';

//     jest.spyOn(fs, 'readdirSync').mockReturnValueOnce([svg1, svg2]);

//     // Mock fs.existsSync to simulate output_dir creation
//     jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false); // Simulate output_dir not existing initially
//     jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true); // Simulate output_dir creation

//     // Mock successful execSync call
//     jest.spyOn(execSync as any, 'execSync').mockImplementation(() => '');

//     processSVG('input_dir', 'output_dir');

//     expect(fs.existsSync).toHaveBeenCalledWith('output_dir');
//     expect(execSync).toHaveBeenCalledTimes(2); // Called twice for two SVG files
//   });

//   it('should handle Inkscape command failure', () => {
//     // Mock fs.readdirSync to simulate SVG files
//     const svg1 = new fs.Dirent();
//     svg1.isFile = () => true;
//     svg1.name = 'file1.svg';

//     jest.spyOn(fs, 'readdirSync').mockReturnValueOnce([svg1]);

//     // Mock execSync to simulate failed Inkscape command execution
//     jest.spyOn(execSync as any, 'execSync').mockImplementation(() => {
//       throw new Error('Failed to execute command');
//     });

//     processSVG('input_dir', 'output_dir');

//     expect(mockConsoleError).toHaveBeenCalledWith(
//       expect.stringContaining('Failed to process')
//     );
//   });
// });
