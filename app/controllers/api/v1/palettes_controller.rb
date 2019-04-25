module Api::V1
  class PalettesController < ApplicationController

    def create
      puts "yay we made it to the palettesController create action **********************"
      data = params[:data]
      user = User.find_by(email: data[:user])
      user.palettes.create(colors: data[:colors])
    end

    def show
      user = User.find_by(username: params[:username])
      render json: user.palettes
    end

  end
end
