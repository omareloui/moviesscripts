{
  description = "A flake for my movies scripts.";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";

    deno2nix.url = "github:SnO2WMaN/deno2nix";
    devshell.url = "github:numtide/devshell";
  };

  outputs = {
    self,
    nixpkgs,
    flake-utils,
    ...
  } @ inputs:
    flake-utils.lib.eachDefaultSystem (system: let
      inherit (pkgs) deno2nix;
      pkgs = import nixpkgs {
        inherit system;
        overlays = with inputs; [
          devshell.overlay
          deno2nix.overlays.default
        ];
      };
    in {
      packages.executable = deno2nix.mkExecutable {
        pname = "moviesscripts";
        version = "1.0.0";

        src = ./.;
        bin = "moviesscripts";

        entrypoint = "./mod.ts";
        lockfile = "deno.lock";
        config = "deno.jsonc";

        allow = {
          env = true;
          read = true;
          run = true;
        };
      };
    });
}
