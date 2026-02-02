# API Configuration

## Development Setup

Update the API_BASE_URL in `src/config/api.ts` based on your development environment:

### iOS Simulator
```typescript
export const API_BASE_URL = 'http://localhost:3000/api';
```

### Android Emulator
```typescript
export const API_BASE_URL = 'http://10.0.2.2:3000/api';
```

### Physical Device (on same network)
```typescript
// Replace YOUR_IP_ADDRESS with your computer's local IP address
// Find it by running: ipconfig getifaddr en0 (macOS) or ipconfig (Windows)
export const API_BASE_URL = 'http://YOUR_IP_ADDRESS:3000/api';
```

### Production
```typescript
export const API_BASE_URL = 'https://your-production-api.com/api';
```

## Testing the API Connection

After starting the app, if you encounter connection issues:

1. Make sure your backend server is running
2. Verify the IP address is correct
3. Check that your device/emulator can reach the backend
4. For physical devices, ensure both are on the same network
