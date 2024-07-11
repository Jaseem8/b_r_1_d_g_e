const axios = require("axios");
const { getQuote } = require("../controllers/quoteController");

jest.mock("axios"); // Mock Axios module

describe("Quote Controller Tests", () => {
  const mockReq = {
    body: {
      fromCoin: {
        chainId: 1,
        address: "0x1234567890abcdef",
      },
      toCoin: {
        chainId: 137,
        address: "0xa0bE1234567890abcde",
      },
      amount: 1000,
    },
  };

  const mockRes = {
    json: jest.fn(),
    status: jest.fn(() => mockRes),
  };

  it("getQuote should return quote data", async () => {
    const mockQuoteData = {
      /* Mock response data */
    };
    axios.get.mockResolvedValue({ data: mockQuoteData });

    await getQuote(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith(mockQuoteData);
  });

  it("getQuote should handle API errors", async () => {
    const errorMessage = "API Error";
    axios.get.mockRejectedValue(new Error(errorMessage));

    await getQuote(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ error: errorMessage });
  });

  // Add more specific tests for different scenarios, validation, etc.
});
