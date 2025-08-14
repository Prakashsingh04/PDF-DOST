from huggingface_hub import HfApi

api = HfApi()

# List first 5 warm text-generation models
models = list(api.list_models(filter="text-generation", inference="warm"))

for model in models[:5]:
    print(model.modelId)
