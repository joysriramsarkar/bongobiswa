
from playwright.sync_api import sync_playwright
import time

def verify_pages():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Verify History Page
        print("Navigating to History Page...")
        try:
            page.goto("http://localhost:3000/history", timeout=60000)
            page.wait_for_load_state("networkidle")
            # Wait for content to load
            page.wait_for_selector("text=পাল সাম্রাজ্যের প্রতিষ্ঠা", timeout=30000)
            page.screenshot(path="verification/history_page.png")
            print("History page screenshot saved.")
        except Exception as e:
            print(f"Error checking history page: {e}")

        # Verify Literature Page
        print("Navigating to Literature Page...")
        try:
            page.goto("http://localhost:3000/literature", timeout=60000)
            page.wait_for_load_state("networkidle")
            # Wait for content to load
            page.wait_for_selector("text=গীতাঞ্জলি", timeout=30000)
            page.screenshot(path="verification/literature_page.png")
            print("Literature page screenshot saved.")
        except Exception as e:
            print(f"Error checking literature page: {e}")

        browser.close()

if __name__ == "__main__":
    verify_pages()
