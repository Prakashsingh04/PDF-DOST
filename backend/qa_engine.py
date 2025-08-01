import json

# Save chunks after splitting
output_path = os.path.join("extracted", f"{filename}.json")
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(chunks, f, ensure_ascii=False, indent=2)
