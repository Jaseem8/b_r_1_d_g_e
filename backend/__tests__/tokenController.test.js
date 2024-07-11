const axios = require("axios");
const { getTokens } = require("../controllers/tokenController");
const { fetchTokens } = require("../services/tokenService");

jest.mock("axios"); // Mock Axios module

describe("Token Controller Tests", () => {
  const mockReq = {
    params: {
      chainID: 1, // Replace with a valid chain ID for testing
    },
  };

  const mockRes = {
    json: jest.fn(),
    status: jest.fn(() => mockRes),
  };

  it("getTokens should return tokens for a given chainID", async () => {
    const mockTokens = [
      { symbol: "ETH", address: "0x1234567890abcdef" },
      { symbol: "USDT", address: "0xa0bE1234567890abcde" },
    ];
    axios.get.mockResolvedValue({ data: mockTokens });

    await getTokens(mockReq, mockRes);

    expect(mockRes.json).toHaveBeenCalledWith(mockTokens);
  });

  it("getTokens should handle API errors", async () => {
    const errorMessage = "API Error";
    axios.get.mockRejectedValue(new Error(errorMessage));

    await getTokens(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
