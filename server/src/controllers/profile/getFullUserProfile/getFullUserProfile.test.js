const { mockUser, mockUserB, signupMockUser, mockRes } = global.testHelpers

const getFullUserProfile = require("./index")

describe("getFullUserProfile controller", () => {
  describe("with invalid arguments", () => {
    const invalidReq = {}

    test("should return a promise", () => {
      const result = getFullUserProfile(invalidReq, mockRes)
      expect(result.constructor).toBe(Promise)
    })

    test("should not throw an error with invalid arguments", (done) => {
      getFullUserProfile(invalidReq, mockRes)
        .catch((err) => {
          expect(err).not.toBeTruthy()
          done(err)
        })
        .then(() => {
          done()
        })
    })

    test("should resolve with empty object given invalid arguments", (done) => {
      const mockResolve = {
        status: () => ({
          json: (response) => {
            expect(response).toBeDefined()
            expect(response).toHaveProperty("userProfile")
            expect(response.userProfile).toEqual({})
            done()
          },
        }),
      }

      const invalidIdReq = {
        query: {
          userId: "nonexistent",
        },
      }

      getFullUserProfile(invalidIdReq, mockResolve).catch(done)
    })
  })

  describe("with valid arguments", () => {
    const mockReq = {
      query: {
        userId: mockUser["userId"],
      },
    }

    test("should resolve with the user profile", (done) => {
      const mockResolve = {
        status: () => ({
          json: (response) => {
            expect(response).toBeDefined()
            expect(response).toHaveProperty("userProfile")
            const { userProfile } = response
            expect(userProfile["userId"]).toBe(mockUser["userId"])
            expect(userProfile["username"]).toBe(mockUser["username"])
            expect(userProfile["firstName"]).toBe(mockUser["firstName"])
            expect(userProfile["lastName"]).toBe(mockUser["lastName"])
            expect(userProfile["zodiac"]).toBe(mockUser["zodiac"])
            expect(userProfile["gender"]).toBe(mockUser["gender"])
            expect(userProfile["breed"]).toBe(mockUser["breed"])
            expect(userProfile["bio"]).toBe(mockUser["bio"])
            expect(userProfile["birthday"]).toBe(mockUser["birthday"])
            expect(userProfile["profilePicture"]).toBe(mockUser["profilePicture"])
            expect(userProfile["zipcodes"]).toEqual(mockUser["zipcodes"])
            expect(userProfile["chats"]).toEqual(mockUser["chats"])
            expect(userProfile["pictures"]).toEqual(mockUser["pictures"])
            done()
          },
        }),
      }

      signupMockUser(mockUser)
        .then(() => {
          return getFullUserProfile(mockReq, mockResolve)
        })
        .catch(done)
    })
  })
})
