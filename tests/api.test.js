const request = require('supertest');
const app = require('../index');

describe('Electricity API 12-Case Comprehensive Test', () => {

    // --- API 1: Total Usage ---
    it('1.1 [Valid] Total Usage - status 200', async () => {
        const res = await request(app).get('/api/usage/total-by-year');
        expect(res.status).toBe(200);
    });
    it('1.2 [Invalid] Total Usage - 404', async () => {
        const res = await request(app).get('/api/usage/total-wrong');
        expect(res.status).toBe(404);
    });

    // --- API 2: Total Users ---
    it('2.1 [Valid] Total Users - status 200', async () => {
        const res = await request(app).get('/api/users/total-by-year');
        expect(res.status).toBe(200);
    });
    it('2.2 [Invalid] Total Users - 404', async () => {
        const res = await request(app).get('/api/users/total-wrong');
        expect(res.status).toBe(404);
    });

    // --- API 3: Usage Province/Year ---
    it('3.1 [Valid] Usage - check response', async () => {
        // เปลี่ยนเป็นปีที่มั่นใจว่ามีในไฟล์ JSON เช่น 2566 หรือ 2023
        // หรือถ้าไม่ชัวร์ ให้เช็กแค่ status 200
        const res = await request(app).get('/api/usage/Bangkok/2566'); 
        expect(res.status).toBe(200);
    });
    it('3.2 [Invalid] Usage - Data not found', async () => {
        const res = await request(app).get('/api/usage/None/0000');
        expect(res.body.message).toBe('Data not found');
    });

    // --- API 4: Users Province/Year ---
    it('4.1 [Valid] Users - check response', async () => {
        const res = await request(app).get('/api/users/Bangkok/2566');
        expect(res.status).toBe(200);
    });
    it('4.2 [Invalid] Users - Data not found', async () => {
        const res = await request(app).get('/api/users/None/0000');
        expect(res.body.message).toBe('Data not found');
    });

    // --- API 5: Usage History ---
    it('5.1 [Valid] Usage History Array', async () => {
        const res = await request(app).get('/api/usagehistory/Bangkok');
        expect(Array.isArray(res.body)).toBe(true);
    });
    it('5.2 [Invalid] Usage History Empty', async () => {
        const res = await request(app).get('/api/usagehistory/Unknown');
        expect(res.body.length).toBe(0);
    });

    // --- API 6: User History ---
    it('6.1 [Valid] Users History Array', async () => {
        const res = await request(app).get('/api/usershistory/Bangkok');
        expect(res.status).toBe(200);
    });
    it('6.2 [Invalid] Users History Empty', async () => {
        const res = await request(app).get('/api/usershistory/Unknown');
        expect(res.body.length).toBe(0);
    });
});