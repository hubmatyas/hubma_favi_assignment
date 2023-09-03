package main

import (
	"encoding/json"
	"io/ioutil"
	"log"

	"github.com/gin-gonic/gin"
)

type ProductDetail struct {
	ID                string   `json:"id"`
	Name              string   `json:"name"`
	Photo             string   `json:"photo"`
	Description       string   `json:"description"`
	Price             string   `json:"price"`
	SimilarProductIDs []string `json:"similarProductIds"`
	Parameters        []struct {
		Name  string `json:"name"`
		Value string `json:"value"`
	} `json:"parameters"`
}

var productCache []ProductDetail

func getProducts(c *gin.Context) {
	c.JSON(200, productCache)
}

func getProduct(c *gin.Context) {
	id := c.Param("id")
	for _, product := range productCache {
		if product.ID == id {
			c.JSON(200, product)
			return
		}
	}
	c.JSON(404, gin.H{"error": "Product not found"})
}

func getSimilar(c *gin.Context) {
	id := c.Param("id")
	var similarProducts []ProductDetail

	for _, product := range productCache {
		if product.ID == id {
			for _, similarID := range product.SimilarProductIDs {
				for _, similarProduct := range productCache {
					if similarProduct.ID == similarID {
						similarProducts = append(similarProducts, similarProduct)
					}
				}
			}
			c.JSON(200, similarProducts) // Normálně bych filtroval data similarProducts, ale pro tento příklad je tam tak akorát to, co potřebujeme
			return
		}
	}
	c.JSON(404, gin.H{"error": "Product not found"})
}

func main() {
	data, err := ioutil.ReadFile("data.json")
	if err != nil {
		log.Fatalf("Failed to read JSON file: %v", err)
	}

	err = json.Unmarshal(data, &productCache)
	if err != nil {
		log.Fatalf("Failed to unmarshal JSON: %v", err)
	}

	r := gin.Default()
	r.GET("/products", getProducts)
	r.GET("/products/:id", getProduct)
	r.GET("/products/:id/similar", getSimilar)
	r.Run(":8000")
}
