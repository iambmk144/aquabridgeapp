import { MOCK_SHRIMP_PRICES } from '../constants';
import { HarvestRequest, ShrimpGrade, HarvestStatus, ShrimpPrice } from '../types';

const DB_KEY = 'aqua_bridge_harvest_requests';
const PRICES_DB_KEY = 'aqua_bridge_market_prices';

// Helper to get data from localStorage
const getDb = (): HarvestRequest[] => {
    const dbString = localStorage.getItem(DB_KEY);
    return dbString ? JSON.parse(dbString) : [];
};

// Helper to save data to localStorage
const saveDb = (db: HarvestRequest[]) => {
    localStorage.setItem(DB_KEY, JSON.stringify(db));
};

// Price DB helpers
const getPricesDb = (): ShrimpPrice[] => {
    const dbString = localStorage.getItem(PRICES_DB_KEY);
    if (dbString) {
        return JSON.parse(dbString);
    }
    // Initialize DB if it doesn't exist
    const initialPrices: ShrimpPrice[] = MOCK_SHRIMP_PRICES.map(p => ({ ...p }));
    localStorage.setItem(PRICES_DB_KEY, JSON.stringify(initialPrices));
    return initialPrices;
};

const savePricesDb = (db: ShrimpPrice[]) => {
    localStorage.setItem(PRICES_DB_KEY, JSON.stringify(db));
};


// Simulate API latency
const withLatency = <T>(data: T): Promise<T> => {
    return new Promise(resolve => setTimeout(() => resolve(data), 500));
};

/**
 * Retrieves market prices.
 */
export const getMarketPrices = (): Promise<ShrimpPrice[]> => {
    const prices = getPricesDb();
    return withLatency(prices);
};

/**
 * Updates a market price.
 */
export const updateMarketPrice = (grade: ShrimpGrade, newPrice: number): Promise<ShrimpPrice> => {
    const db = getPricesDb();
    const priceIndex = db.findIndex(p => p.grade === grade);

    if (priceIndex === -1) {
        return Promise.reject(new Error("Price for grade not found"));
    }
    
    const oldPrice = db[priceIndex].price;
    if (oldPrice === newPrice) {
      return withLatency(db[priceIndex]);
    }
    
    const updatedPrice: ShrimpPrice = {
        ...db[priceIndex],
        price: newPrice,
        previousPrice: oldPrice
    };
    
    db[priceIndex] = updatedPrice;
    savePricesDb(db);
    
    return withLatency(updatedPrice);
}

/**
 * Submits a new harvest request.
 * Mimics an API POST request.
 */
export const submitHarvestRequest = (
    requestData: Omit<HarvestRequest, 'id' | 'status' | 'timestamp'>
): Promise<HarvestRequest> => {
    const db = getDb();
    
    const newRequest: HarvestRequest = {
        ...requestData,
        id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        status: 'Pending Approval',
        timestamp: Date.now(),
    };

    db.push(newRequest);
    saveDb(db);
    
    return withLatency(newRequest);
};

/**
 * Retrieves all harvest requests for a specific user.
 * Mimics an API GET request.
 */
export const getHarvestRequestsForUser = (farmerId: string): Promise<HarvestRequest[]> => {
    const db = getDb();
    const userRequests = db.filter(req => req.farmerId === farmerId);
    return withLatency(userRequests);
};

/**
 * Retrieves all harvest requests. For admin use.
 * Mimics an API GET request.
 */
export const getAllHarvestRequests = (): Promise<HarvestRequest[]> => {
    const db = getDb();
    // sort by most recent first
    const sortedDb = db.sort((a, b) => b.timestamp - a.timestamp);
    return withLatency(sortedDb);
};

/**
 * Updates the status of a specific harvest request. For admin use.
 * Mimics an API PATCH request.
 */
export const updateHarvestRequestStatus = (
    requestId: string,
    newStatus: HarvestStatus
): Promise<HarvestRequest> => {
    const db = getDb();
    const requestIndex = db.findIndex(req => req.id === requestId);

    if (requestIndex === -1) {
        return Promise.reject(new Error("Request not found"));
    }

    const updatedRequest = { ...db[requestIndex], status: newStatus };
    db[requestIndex] = updatedRequest;
    saveDb(db);

    return withLatency(updatedRequest);
};