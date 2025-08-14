export const getUserIP = async (): Promise<string> => {
  try {
    // Using a free IP API service
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip || 'unknown';
  } catch (error) {
    console.warn('Failed to get IP address:', error);
    return 'unknown';
  }
};